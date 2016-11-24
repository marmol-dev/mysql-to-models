"use strict";
class Constraint {
    constructor({ CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE }) {
        this._constraintName = CONSTRAINT_NAME;
        this._tableName = TABLE_NAME;
        this._constraintType = CONSTRAINT_TYPE;
        this._columns = [];
        this._columnNames = [];
    }
    get constraintName() {
        return this._constraintName;
    }
    get constraintType() {
        return this._constraintType;
    }
    get tableName() {
        return this._tableName;
    }
    get columnNames() {
        return this._columnNames;
    }
    set columns(cols) {
        this._columns = cols;
    }
    get columns() {
        return this._columns;
    }
    get areAllColumnsAutoIncrement() {
        return this._columns.every(col => col.isAutoIncrement);
    }
    get containsPrimaryKeyColumn() {
        return !!this.columns.find(col => col.isPrimaryKey);
    }
    get nonAutoIncrementColumns() {
        return this._columns.filter(col => !col.isAutoIncrement);
    }
    get isUniquenessType() {
        return this.isUniqueType || this.isPrimaryKeyType;
    }
    get isUniqueType() {
        return this._constraintType === 'UNIQUE';
    }
    get isPrimaryKeyType() {
        return this._constraintType === 'PRIMARY KEY';
    }
    get table() {
        return this._columns[0].table;
    }
    addColumnName(columnName) {
        this._columnNames.push(columnName);
    }
    involvesColumns(cols) {
        return this.columns.length === cols.length
            && cols.every(col => this._columns.lastIndexOf(col) > -1)
            && this._columns.every(col => cols.lastIndexOf(col) > -1);
    }
}
module.exports = Constraint;
//# sourceMappingURL=constraint.model.js.map