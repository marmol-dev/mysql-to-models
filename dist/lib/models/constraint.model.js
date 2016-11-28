"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const xserializer_1 = require("xserializer");
let Constraint = class Constraint {
    constructor({ CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE }, index) {
        this._index = index;
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
};
__decorate([
    xserializer_1.Deserialize()
], Constraint.prototype, "_constraintName", void 0);
__decorate([
    xserializer_1.Deserialize()
], Constraint.prototype, "_tableName", void 0);
__decorate([
    xserializer_1.Deserialize()
], Constraint.prototype, "_constraintType", void 0);
__decorate([
    xserializer_1.Deserialize()
], Constraint.prototype, "_columns", void 0);
__decorate([
    xserializer_1.Deserialize()
], Constraint.prototype, "_columnNames", void 0);
__decorate([
    xserializer_1.Deserialize()
], Constraint.prototype, "_index", void 0);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "constraintName", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "constraintType", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "tableName", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "columnNames", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "columns", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "areAllColumnsAutoIncrement", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "containsPrimaryKeyColumn", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "nonAutoIncrementColumns", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "isUniquenessType", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "isUniqueType", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "isPrimaryKeyType", null);
__decorate([
    xserializer_1.Serialize()
], Constraint.prototype, "table", null);
Constraint = __decorate([
    xserializer_1.Serializable(),
    xserializer_1.Deserializable()
], Constraint);
module.exports = Constraint;
//# sourceMappingURL=constraint.model.js.map