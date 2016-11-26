"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const serializable_1 = require("../helpers/serializable");
const deserializable_1 = require("../helpers/deserializable");
let ForeignKey = class ForeignKey {
    constructor({ TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME }, index) {
        this._index = index;
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
};
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_tableName", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_columnName", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_constraintName", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_referencedTableName", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_referencedColumnName", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_table", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_column", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_referencedTable", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_referencedColumn", void 0);
__decorate([
    deserializable_1.Deserialize()
], ForeignKey.prototype, "_index", void 0);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "tableName", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "columnName", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "table", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "column", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "constraintName", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "referencedTableName", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "referencedColumnName", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "referencedTable", null);
__decorate([
    serializable_1.Serialize()
], ForeignKey.prototype, "referencedColumn", null);
ForeignKey = __decorate([
    serializable_1.Serializable(),
    deserializable_1.Deserializable()
], ForeignKey);
module.exports = ForeignKey;
//# sourceMappingURL=foreign_key.model.js.map