import Table = require('./table.model');
import {Construct, Id, Serialize} from "../helpers/serializable";
import {Deserialize, Deserializable} from "../helpers/deserializable";

abstract class Relationship {

    @Deserialize()
    private _numberOfRelationshipsWithSameTables : number;

    @Deserialize()
    private _indexInSameTablesRelationships : number;

    @Id()
    @Deserialize()
    private _index : number;

    constructor(index : number) {
        this._index = index;
        this._numberOfRelationshipsWithSameTables = 1;
        this._indexInSameTablesRelationships = 0;
    }

    /**
     * The number of relationships (of the same type) with the same tables involved
     * 
     * @type {number}
     */
    @Serialize()
    get numberOfRelationshipsWithSameTables() {
        return this._numberOfRelationshipsWithSameTables;
    }

    set numberOfRelationshipsWithSameTables(num) {
        this._numberOfRelationshipsWithSameTables = num;
    }

    /**
     * The index in the same tables relationships
     * 
     * @description There are another relationships that involve the same tables. Every relationship has an index.
     * @type {number}
     */
    @Serialize()
    get indexInSameTablesRelationships() {
        return this._indexInSameTablesRelationships;
    }

    set indexInSameTablesRelationships(index) {
        this._indexInSameTablesRelationships = index;
    }

    abstract involvesSameTables(relationship : Relationship) : boolean;

    abstract getNameFromSide(tableSide : Table) : string;

    abstract getPluralNameFromSide(tableSide: Table) : string;
}

export = Relationship;