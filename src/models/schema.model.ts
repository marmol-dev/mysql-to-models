import Column = require('./column.model');
import Table = require('./table.model');

import OneToOneRelationship = require('./one_to_one_relationship.model');
import OneToManyRelationship = require('./one_to_many_relationship.model');
import ManyToManyRelationship = require('./many_to_many_relationship.model');
import Constraint = require('./constraint.model');
import ForeignKey = require('./foreign_key.model');
import Entity = require('./entity.model');
import _ = require('lodash');


interface ISchema {
    columns: Column[];
    tables: Table[];
    oneToOneRelationships: OneToOneRelationship[];

    oneToManyRelationships: OneToManyRelationship[];

    manyToManyRelationships: ManyToManyRelationship[];
    constraints: Constraint[];
    foreignKeys: ForeignKey[];
    entities: Entity[];
}

class Schema implements ISchema {

    private _columns: Column[];
    private _tables: Table[];
    private _oneToOneRelationships: OneToOneRelationship[];
    private _oneToManyRelationships: OneToManyRelationship[];
    private _manyToManyRelationships: ManyToManyRelationship[];
    private _constraints: Constraint[];
    private _foreignKeys: ForeignKey[];
    private _entities: Entity[];

    constructor(schema: ISchema){
        this._columns = schema.columns;
        this._tables = schema.tables;
        this._oneToManyRelationships = schema.oneToManyRelationships;
        this._oneToOneRelationships = schema.oneToOneRelationships;
        this._manyToManyRelationships = schema.manyToManyRelationships;
        this._constraints = schema.constraints;
        this._foreignKeys = schema.foreignKeys;
        this._entities = schema.entities;
    }

    get columns(): Column[] {
        return this._columns;
    }

    get tables(): Table[] {
        return this._tables;
    }

    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    }

    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }

    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    }

    get constraints(): Constraint[] {
        return this._constraints;
    }

    get foreignKeys(): ForeignKey[] {
        return this._foreignKeys;
    }

    get entities(): Entity[] {
        return this._entities;
    }

    toJSON() {
        return _.pick(this,
            'entities',
            'foreignKeys',
            'constraints',
            'manyToManyRelationships',
            'oneToManyRelationships',
            'oneToOneRelationships',
            'tables',
            'columns'
        );
    }
}

export = Schema;