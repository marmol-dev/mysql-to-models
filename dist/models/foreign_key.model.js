"use strict";
class ForeignKey {
    constructor({ TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME }) {
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._constraintName = CONSTRAINT_NAME;
        this._referencedTableName = REFERENCED_TABLE_NAME;
        this._referencedColumnName = REFERENCED_COLUMN_NAME;
    }
    get tableName() {
        return this._tableName;
    }
    get columnName() {
        return this._columnName;
    }
    get table() {
        return this._table;
    }
    set table(table) {
        this._table = table;
    }
    get column() {
        return this._column;
    }
    set column(column) {
        this._column = column;
    }
    get constraintName() {
        return this._constraintName;
    }
    get referencedTableName() {
        return this._referencedTableName;
    }
    get referencedColumnName() {
        return this._referencedColumnName;
    }
    get referencedTable() {
        return this._referencedTable;
    }
    set referencedTable(table) {
        this._referencedTable = table;
    }
    get referencedColumn() {
        return this._referencedColumn;
    }
    set referencedColumn(column) {
        this._referencedColumn = column;
    }
}
module.exports = ForeignKey;
//# sourceMappingURL=foreign_key.model.js.map