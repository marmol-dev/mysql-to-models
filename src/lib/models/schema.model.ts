import Column = require('./column.model');
import Table = require('./table.model');

import OneToOneRelationship = require('./one_to_one_relationship.model');
import OneToManyRelationship = require('./one_to_many_relationship.model');
import ManyToManyRelationship = require('./many_to_many_relationship.model');
import Constraint = require('./constraint.model');
import ForeignKey = require('./foreign_key.model');
import Annotation = require("./annotation.model");

import {Deserializer, Deserializable, Deserialize, Serialize, Serializable} from "xserializer";

function classProvider(name: string) : Function {

    function NullClass() {}
    NullClass.prototype = null;

    switch(name){
        case null:
            return NullClass;
        case 'Object':
            return Object;
        case 'Table':
            return Table;
        case 'Column':
            return Column;
        case 'Annotation':
            return Annotation;
        case 'Constraint':
            return Constraint;
        case 'ForeignKey':
            return ForeignKey;
        case 'ManyToManyRelationship':
            return ManyToManyRelationship;
        case 'OneToManyRelationship':
            return OneToManyRelationship;
        case 'OneToOneRelationship':
            return OneToOneRelationship;
        case 'Schema':
            return Schema;
        default:
            throw new Error(`Provider doesn't found a class with name ${name}`);
    }
}

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

@Deserializable()
@Serializable()
class Schema implements ISchema {

    @Deserialize()
    private _columns: Column[];
    @Deserialize()
    private _tables: Table[];
    @Deserialize()
    private _oneToOneRelationships: OneToOneRelationship[];
    @Deserialize()
    private _oneToManyRelationships: OneToManyRelationship[];
    @Deserialize()
    private _manyToManyRelationships: ManyToManyRelationship[];
    @Deserialize()
    private _constraints: Constraint[];
    @Deserialize()
    private _foreignKeys: ForeignKey[];
    @Deserialize()
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

    @Serialize()
    get columns(): Column[] {
        return this._columns;
    }

    @Serialize()
    get tables(): Table[] {
        return this._tables;
    }

    @Serialize()
    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    }

    @Serialize()
    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }

    @Serialize()
    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    }

    @Serialize()
    get constraints(): Constraint[] {
        return this._constraints;
    }

    @Serialize()
    get foreignKeys(): ForeignKey[] {
        return this._foreignKeys;
    }

    @Serialize()
    get annotations(): Annotation[] {
        return this._annotations;
    }

    static fromJSON(obj : any) : Schema {
        const deserializer = new Deserializer(obj);
        deserializer.constructorProvider = classProvider;
        return deserializer.deserialize();
    }
}

export = Schema;