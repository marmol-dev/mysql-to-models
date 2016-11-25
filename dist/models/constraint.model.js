"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Indexable = require('./indexable.model');
let Constraint = class Constraint extends Indexable {
    constructor({ CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE }, index) {
        super(index);
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
    Indexable.ToJSON()
], Constraint.prototype, "constraintName", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "constraintType", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "tableName", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "columnNames", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "columns", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "areAllColumnsAutoIncrement", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "containsPrimaryKeyColumn", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "nonAutoIncrementColumns", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "isUniquenessType", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "isUniqueType", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "isPrimaryKeyType", null);
__decorate([
    Indexable.ToJSON()
], Constraint.prototype, "table", null);
Constraint = __decorate([
    Indexable.CollectionName("constraints")
], Constraint);
module.exports = Constraint;
//# sourceMappingURL=constraint.model.js.map