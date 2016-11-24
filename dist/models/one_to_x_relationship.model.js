"use strict";
const Relationship = require('./relationship.model');
class OneToXRelationship extends Relationship {
    constructor(name) {
        super();
        this._name = name;
        this._foreignKeys = [];
    }
    get foreignKeys() {
        return this._foreignKeys;
    }
    set foreignKeys(fks) {
        this._foreignKeys = fks;
    }
    addForeignKey(fk) {
        this._foreignKeys.push(fk);
    }
    get name() {
        return this._name;
    }
    involvesSameTables(rel) {
        throw new Error('Not implemented');
    }
    getNameFromSide(tableSide) {
        throw new Error('Not implemented');
    }
    getPluralNameFromSide(tableSide) {
        throw new Error('Not implemented');
    }
    getOtherSideColumn(column) {
        let otherSideColumn;
        let i = 0;
        while (!otherSideColumn && i < this.foreignKeys.length) {
            if (this.foreignKeys[i].referencedColumn === column) {
                otherSideColumn = this.foreignKeys[i].column;
            }
            else if (this.foreignKeys[i].column) {
                otherSideColumn = this.foreignKeys[i].referencedColumn;
            }
            i++;
        }
        if (!otherSideColumn) {
            throw new Error(`Column "${column.columnName}" not found in foreign keys of relationship "${this.name}"`);
        }
        return otherSideColumn;
    }
    get foreignKeysContainPrimaryKey() {
        return !!this.foreignKeys.find(fk => fk.column.isPrimaryKey);
    }
}
module.exports = OneToXRelationship;
//# sourceMappingURL=one_to_x_relationship.model.js.map