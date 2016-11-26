import _ = require('lodash');
import NamesHelper = require('../helpers/names.helper');
import Constraint = require('./constraint.model');
import Column = require('./column.model');
import OneToOneRelationships = require('./one_to_one_relationship.model');
import OneToManyRelationships = require('./one_to_many_relationship.model');
import ManyToManyRelationships = require('./many_to_many_relationship.model');
import OneToXRelationship = require('./one_to_x_relationship.model');
import Annotation = require("./annotation.model");
import {Id, Serializable, Serialize} from '../helpers/serializable';
import {Deserialize, Deserializable} from "../helpers/deserializable";


@Serializable()
@Deserializable()
class Table {

    @Deserialize()
    private _tableName : string;
    @Deserialize()
    private _columns : Column[];
    @Deserialize()
    private _constraints : Constraint[];
    @Deserialize()
    private _oneToOneRelationships : OneToOneRelationships[];
    @Deserialize()
    private _oneToManyRelationships : OneToManyRelationships[];
    @Deserialize()
    private _manyToManyRelationships : ManyToManyRelationships[];
    @Deserialize()
    private _tableType : string;
    @Deserialize()
    private _tableComment : string;
    @Deserialize()
    private _annotations : Annotation[];

    @Id()
    @Deserialize()
    private _index: number;

    constructor({TABLE_NAME, TABLE_TYPE, TABLE_COMMENT}: {[p:string] : string}, index : number) {
        this._index = index;
        this._tableName = TABLE_NAME;
        this._constraints = [];
        this._tableType = TABLE_TYPE;
        this._tableComment = TABLE_COMMENT;
    }

    @Serialize()
    get tableName() {
        return this._tableName; 
    }

    @Serialize()
    get tableType(): string {
        return this._tableType;
    }

    @Serialize()
    get tableComment(): string {
        return this._tableComment;
    }

    @Serialize()
    get columns() {
        return this._columns;
    }

    @Serialize()
    get sortedColumns() {
        return this._columns;
    }

    @Serialize()
    get pascalName() {
        return _.upperFirst(this.camelName);
    }

    @Serialize()
    get pluralPascalName() {
        return NamesHelper.plural(this.pascalName);
    }

    @Serialize()
    get modelName() {
        return this.pascalName;
    }

    @Serialize()
    get camelName() {
        return _.camelCase(this.tableName);
    }

    @Serialize()
    get instanceName() {
        return this.camelName;
    }

    @Serialize()
    get pluralCamelName() {
        return NamesHelper.plural(this.camelName);
    }

    @Serialize()
    get pluralInstanceName() {
       return this.pluralCamelName;
    }

    set columns(columns) {
        this._columns = columns.sort((c1, c2) => {
            const pos1 = parseInt(c1.ordinalPosition);
            const pos2 = parseInt(c2.ordinalPosition);

            if (pos1 < pos2) return -1;
            else if (pos2 > pos1) return 1;
            else return 0;
        });
    }

    @Serialize()
    get primaryKeyColumns() {
        return this._columns.filter(column => column.isPrimaryKey);
    }

    @Serialize()
    get isEntity() {
        return true;
        //return !this.columns.every(column => column.isForeignKey);
    }

    @Serialize()
    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    } 

    set oneToOneRelationships(relationships) {
        this._oneToOneRelationships = relationships;
    }

    @Serialize()
    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }

    @Serialize()
    get oneToOneEntityRelationships() {
        return this.oneToOneRelationships.filter(rel => rel.isBetweenEntities);
    }

    set oneToManyRelationships(relationships) {
        this._oneToManyRelationships = relationships;
    }

    @Serialize()
    get oneToManyEntityRelationships() {
        return this.oneToManyRelationships.filter(rel => rel.isBetweenEntities);
    }

    @Serialize()
    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    } 

    set manyToManyRelationships(relationships) {
        this._manyToManyRelationships = relationships;
    }

    @Serialize()
    get manyToManyEntityRelationships() {
        return this.manyToManyRelationships.filter(rel => rel.isBetweenEntities);
    }

    @Serialize()
    get relatedTables() {
        const relatedTables : Table[] = [];

        const appendFunction = (t: Table) => {
            if (t !== this && relatedTables.lastIndexOf(t) === -1) {
                relatedTables.push(t);
            }
        };

        this.oneToOneRelationships.forEach(rel => {
            [rel.oneSideTable, rel.anotherSideTable].forEach(appendFunction);
        });

        this.oneToManyRelationships.forEach(rel => {
            [rel.oneSideTable, rel.manySideTable].forEach(appendFunction);
        });

        this.manyToManyRelationships.forEach(rel => {
            [rel.manySide1Table, rel.manySide2Table, rel.innerTable].forEach(appendFunction);
        });

        return relatedTables;
    }

    @Serialize()
    get foreignKeysRelatedTables(){
        const toret : Table[] = [];

        [...this.oneToOneRelationships, ...this.oneToManyRelationships].forEach((rel : OneToXRelationship) => {
            if (rel.foreignKeys[0].table === this){
                if (toret.lastIndexOf(rel.foreignKeys[0].referencedTable) === -1) {
                    toret.push(rel.foreignKeys[0].referencedTable);
                }
            }     
        });

        return toret;
    }

    @Serialize()
    get relatedEntityTables() {
        return this.relatedTables.filter(t => t.isEntity);
    }

    @Serialize()
    get constraints() {
        return this._constraints;
    }

    /**
     * Get constraints removing the unique constraints that has a priamary key constraint involving the same columns
     * 
     * @readonly
     * 
     * @memberOf Table
     */
    @Serialize()
    get nonRepeatedConstraints() {
        return this.constraints.filter(cons => {
            return !cons.isUniqueType || !this.primaryKeyConstraints.find(pkCons => pkCons.involvesColumns(cons.columns));
        });
    }

    @Serialize()
    get uniqueConstraints() {
        return this._constraints.filter(cons => cons.isUniqueType);
    }

    @Serialize()
    get nonRepeatedUniqueConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniqueType);
    }

    @Serialize()
    get uniquenessConstraints() {
        return this._constraints.filter(cons => cons.isUniquenessType);
    }

    @Serialize()
    get nonRepeatedUniquenessConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniquenessType);
    }

    @Serialize()
    get primaryKeyConstraints() {
        return this._constraints.filter(cons => cons.isPrimaryKeyType);
    }

    set constraints(c) {
       this._constraints = c; 
    }

    @Serialize()
    get annotations() : Annotation[] {
        return this._annotations;
    }


    set annotations(value: Annotation[]) {
        this._annotations = value;
    }
}

export = Table;