"use strict";
class Relationship {
    constructor() {
        this._numberOfRelationshipsWithSameTables = 1;
        this._indexInSameTablesRelationships = 0;
    }
    /**
     * The number of relationships (of the same type) with the same tables involved
     *
     * @type {number}
     */
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
    get indexInSameTablesRelationships() {
        return this._indexInSameTablesRelationships;
    }
    set indexInSameTablesRelationships(index) {
        this._indexInSameTablesRelationships = index;
    }
}
module.exports = Relationship;
//# sourceMappingURL=relationship.model.js.map