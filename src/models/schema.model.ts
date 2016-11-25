import Column = require('./column.model');
import Table = require('./table.model');

import OneToOneRelationship = require('./one_to_one_relationship.model');
import OneToManyRelationship = require('./one_to_many_relationship.model');
import ManyToManyRelationship = require('./many_to_many_relationship.model');
import Constraint = require('./constraint.model');
import ForeignKey = require('./foreign_key.model');
import _ = require('lodash');
import Annotation = require("./annotation.model");
import Indexable = require("./indexable.model");


interface ISchema {
    annotations: Annotation[];
    columns: Column[];
    tables: Table[];
    oneToOneRelationships: OneToOneRelationship[];

    oneToManyRelationships: OneToManyRelationship[];

    manyToManyRelationships: ManyToManyRelationship[];
    constraints: Constraint[];
    foreignKeys: ForeignKey[];
}

class Schema extends Indexable implements ISchema {

    private _columns: Column[];
    private _tables: Table[];
    private _oneToOneRelationships: OneToOneRelationship[];
    private _oneToManyRelationships: OneToManyRelationship[];
    private _manyToManyRelationships: ManyToManyRelationship[];
    private _constraints: Constraint[];
    private _foreignKeys: ForeignKey[];
    private _annotations: Annotation[];

    constructor(schema: ISchema){
        super(0);
        this._columns = schema.columns;
        this._tables = schema.tables;
        this._oneToManyRelationships = schema.oneToManyRelationships;
        this._oneToOneRelationships = schema.oneToOneRelationships;
        this._manyToManyRelationships = schema.manyToManyRelationships;
        this._constraints = schema.constraints;
        this._foreignKeys = schema.foreignKeys;
        this._annotations = schema.annotations;
    }

    @Indexable.ToJSON(false, true)
    get columns(): Column[] {
        return this._columns;
    }

    @Indexable.ToJSON(false, true)
    get tables(): Table[] {
        return this._tables;
    }

    @Indexable.ToJSON(false, true)
    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    }

    @Indexable.ToJSON(false, true)
    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }

    @Indexable.ToJSON(false, true)
    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    }

    @Indexable.ToJSON(false, true)
    get constraints(): Constraint[] {
        return this._constraints;
    }

    @Indexable.ToJSON(false, true)
    get foreignKeys(): ForeignKey[] {
        return this._foreignKeys;
    }

    @Indexable.ToJSON(false, true)
    get annotations(): Annotation[] {
        return this._annotations;
    }
}

export = Schema;