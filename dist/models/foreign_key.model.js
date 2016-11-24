"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Indexable = require('./indexable.model');
class ForeignKey extends Indexable {
    constructor({ TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME }, index) {
        super(index);
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
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "tableName", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "columnName", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "table", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "column", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "constraintName", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "referencedTableName", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "referencedColumnName", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "referencedTable", null);
__decorate([
    Indexable.ToJSON()
], ForeignKey.prototype, "referencedColumn", null);
module.exports = ForeignKey;
//# sourceMappingURL=foreign_key.model.js.map