import _ = require('lodash');
import NamesHelper = require('../helpers/names.helper');
import Constraint = require('./constraint.model');
import Column = require('./column.model');
import OneToOneRelationships = require('./one_to_one_relationship.model');
import OneToManyRelationships = require('./one_to_many_relationship.model');
import ManyToManyRelationships = require('./many_to_many_relationship.model');
import OneToXRelationship = require('./one_to_x_relationship.model');
import Indexable = require('./indexable.model');

class Table extends Indexable {

    private _tableName : string;

    private _columns : Column[];
    private _constraints : Constraint[];
    private _oneToOneRelationships : OneToOneRelationships[];
    private _oneToManyRelationships : OneToManyRelationships[];
    private _manyToManyRelationships : ManyToManyRelationships[];
    private _tableType : string;
    private _tableComment : string;

    constructor({TABLE_NAME, TABLE_TYPE, TABLE_COMMENT}: {[p:string] : string}, index : number) {
        super(index);
        this._tableName = TABLE_NAME;
        this._constraints = [];
        this._tableType = TABLE_TYPE;
        this._tableComment = TABLE_COMMENT;
    }

    @Indexable.ToJSON()
    get tableName() {
        return this._tableName; 
    }

    @Indexable.ToJSON()
    get tableType(): string {
        return this._tableType;
    }

    @Indexable.ToJSON()
    get tableComment(): string {
        return this._tableComment;
    }

    @Indexable.ToJSON()
    get columns() {
        return this._columns;
    }

    @Indexable.ToJSON()
    get sortedColumns() {
        return this._columns;
    }

    @Indexable.ToJSON()
    get pascalName() {
        return _.upperFirst(this.camelName);
    }

    @Indexable.ToJSON()
    get pluralPascalName() {
        return NamesHelper.plural(this.pascalName);
    }

    @Indexable.ToJSON()
    get modelName() {
        return this.pascalName;
    }

    @Indexable.ToJSON()
    get camelName() {
        return _.camelCase(this.tableName);
    }

    @Indexable.ToJSON()
    get instanceName() {
        return this.camelName;
    }

    @Indexable.ToJSON()
    get pluralCamelName() {
        return NamesHelper.plural(this.camelName);
    }

    @Indexable.ToJSON()
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

    @Indexable.ToJSON()
    get primaryKeyColumns() {
        return this._columns.filter(column => column.isPrimaryKey);
    }

    @Indexable.ToJSON()
    get isEntity() {
        return true;
        //return !this.columns.every(column => column.isForeignKey);
    }

    @Indexable.ToJSON()
    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    } 

    set oneToOneRelationships(relationships) {
        this._oneToOneRelationships = relationships;
    }

    @Indexable.ToJSON()
    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }

    @Indexable.ToJSON()
    get oneToOneEntityRelationships() {
        return this.oneToOneRelationships.filter(rel => rel.isBetweenEntities);
    }

    set oneToManyRelationships(relationships) {
        this._oneToManyRelationships = relationships;
    }

    @Indexable.ToJSON()
    get oneToManyEntityRelationships() {
        return this.oneToManyRelationships.filter(rel => rel.isBetweenEntities);
    }

    @Indexable.ToJSON()
    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    } 

    set manyToManyRelationships(relationships) {
        this._manyToManyRelationships = relationships;
    }

    @Indexable.ToJSON()
    get manyToManyEntityRelationships() {
        return this.manyToManyRelationships.filter(rel => rel.isBetweenEntities);
    }

    @Indexable.ToJSON()
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

    @Indexable.ToJSON()
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

    @Indexable.ToJSON()
    get relatedEntityTables() {
        return this.relatedTables.filter(t => t.isEntity);
    }

    @Indexable.ToJSON()
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
    @Indexable.ToJSON()
    get nonRepeatedConstraints() {
        return this.constraints.filter(cons => {
            return !cons.isUniqueType || !this.primaryKeyConstraints.find(pkCons => pkCons.involvesColumns(cons.columns));
        });
    }

    @Indexable.ToJSON()
    get uniqueConstraints() {
        return this._constraints.filter(cons => cons.isUniqueType);
    }

    @Indexable.ToJSON()
    get nonRepeatedUniqueConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniqueType);
    }

    @Indexable.ToJSON()
    get uniquenessConstraints() {
        return this._constraints.filter(cons => cons.isUniquenessType);
    }

    @Indexable.ToJSON()
    get nonRepeatedUniquenessConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniquenessType);
    }

    @Indexable.ToJSON()
    get primaryKeyConstraints() {
        return this._constraints.filter(cons => cons.isPrimaryKeyType);
    }

    set constraints(c) {
       this._constraints = c; 
    }
}

export = Table;