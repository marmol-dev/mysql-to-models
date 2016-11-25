import Column = require('./column.model');
import Table = require('./table.model');

import OneToOneRelationship = require('./one_to_one_relationship.model');
import OneToManyRelationship = require('./one_to_many_relationship.model');
import ManyToManyRelationship = require('./many_to_many_relationship.model');
import Constraint = require('./constraint.model');
import ForeignKey = require('./foreign_key.model');
import Annotation = require("./annotation.model");
import {Serializable, Construct, Serialize} from "../helpers/serializable";


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

@Serializable()
class Schema implements ISchema {

    @Construct()
    private _columns: Column[];
    @Construct()
    private _tables: Table[];
    @Construct()
    private _oneToOneRelationships: OneToOneRelationship[];
    @Construct()
    private _oneToManyRelationships: OneToManyRelationship[];
    @Construct()
    private _manyToManyRelationships: ManyToManyRelationship[];
    @Construct()
    private _constraints: Constraint[];
    @Construct()
    private _foreignKeys: ForeignKey[];
    @Construct()
    private _annotations: Annotation[];

    constructor(schema: ISchema){
        this._columns = schema.columns;
        this._tables = schema.tables;
        this._oneToManyRelationships = schema.oneToManyRelationships;
        this._oneToOneRelationships = schema.oneToOneRelationships;
        this._manyToManyRelationships = schema.manyToManyRelationships;
        this._constraints = schema.constraints;
        this._foreignKeys = schema.foreignKeys;
        this._annotations = schema.annotations;
    }

    @Serialize(false)
    get columns(): Column[] {
        return this._columns;
    }

    @Serialize(false)
    get tables(): Table[] {
        return this._tables;
    }

    @Serialize(false)
    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    }

    @Serialize(false)
    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }

    @Serialize(false)
    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    }

    @Serialize(false)
    get constraints(): Constraint[] {
        return this._constraints;
    }

    @Serialize(false)
    get foreignKeys(): ForeignKey[] {
        return this._foreignKeys;
    }

    @Serialize(false)
    get annotations(): Annotation[] {
        return this._annotations;
    }
}

export = Schema;