import _ = require('lodash');
import NamesHelper = require('../helpers/names.helper');
import Constraint = require('./constraint.model');
import Column = require('./column.model');
import OneToOneRelationships = require('./one_to_one_relationship.model');
import OneToManyRelationships = require('./one_to_many_relationship.model');
import ManyToManyRelationships = require('./many_to_many_relationship.model');
import OneToXRelationship = require('./one_to_x_relationship.model');
import Entity = require('./entity.model');


class Table {

    private _tableName : string;
    
    private _columns : Column[];
    private _constraints : Constraint[];
    private _oneToOneRelationships : OneToOneRelationships[];
    private _oneToManyRelationships : OneToManyRelationships[];
    private _manyToManyRelationships : ManyToManyRelationships[];
    private _entity : Entity;


    constructor({TABLE_NAME}: {[p:string] : string}) {
        this._tableName = TABLE_NAME;
        this._constraints = [];
    }

    get tableName() {
        return this._tableName; 
    }

    get columns() {
        return this._columns;
    }

    get sortedColumns() {
        return this._columns;
    }

    get pascalName() {
        return _.upperFirst(this.camelName);
    }

    get pluralPascalName() {
        return NamesHelper.plural(this.pascalName);
    }

    get modelName() {
        return this.pascalName;
    }

    get camelName() {
        return _.camelCase(this.tableName);
    }

    get instanceName() {
        return this.camelName;
    }

    get pluralCamelName() {
        return NamesHelper.plural(this.camelName);
    }

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

    get primaryKeyColumns() {
        return this._columns.filter(column => column.isPrimaryKey);
    }

    get isEntity() {
        return true;
        //return !this.columns.every(column => column.isForeignKey);
    }

    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    } 

    set oneToOneRelationships(relationships) {
        this._oneToOneRelationships = relationships;
    }

    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    } 

    get oneToOneEntityRelationships() {
        return this.oneToOneRelationships.filter(rel => rel.isBetweenEntities);
    }

    set oneToManyRelationships(relationships) {
        this._oneToManyRelationships = relationships;
    }

    get oneToManyEntityRelationships() {
        return this.oneToManyRelationships.filter(rel => rel.isBetweenEntities);
    }

    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    } 

    set manyToManyRelationships(relationships) {
        this._manyToManyRelationships = relationships;
    }

    get manyToManyEntityRelationships() {
        return this.manyToManyRelationships.filter(rel => rel.isBetweenEntities);
    }

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

    get relatedEntityTables() {
        return this.relatedTables.filter(t => t.isEntity);
    }

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
    get nonRepeatedConstraints() {
        return this.constraints.filter(cons => {
            return !cons.isUniqueType || !this.primaryKeyConstraints.find(pkCons => pkCons.involvesColumns(cons.columns));
        });
    }

    get uniqueConstraints() {
        return this._constraints.filter(cons => cons.isUniqueType);
    }

    get nonRepeatedUniqueConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniqueType);
    }

    get uniquenessConstraints() {
        return this._constraints.filter(cons => cons.isUniquenessType);
    }

    get nonRepeatedUniquenessConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniquenessType);
    }

    get primaryKeyConstraints() {
        return this._constraints.filter(cons => cons.isPrimaryKeyType);
    }

    set constraints(c) {
       this._constraints = c; 
    }

    get entity(){
        if (!this._entity) {
            this._entity = new Entity(this);
        }

        return this._entity;
    }
}

export = Table;