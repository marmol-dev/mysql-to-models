import Table = require('./table.model');
import Indexable = require('./indexable.model');

abstract class Relationship extends Indexable {

    private _numberOfRelationshipsWithSameTables : number;
    private _indexInSameTablesRelationships : number;

    constructor(index : number) {
        super(index);
        this._numberOfRelationshipsWithSameTables = 1;
        this._indexInSameTablesRelationships = 0;
    }

    /**
     * The number of relationships (of the same type) with the same tables involved
     * 
     * @type {number}
     */
    @Indexable.ToJSON()
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
    @Indexable.ToJSON()
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