"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const _ = require('lodash');
const Indexable = require('./indexable.model');
class Column extends Indexable {
    constructor({ TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_TYPE, COLUMN_KEY, EXTRA, COLUMN_COMMENT }, index) {
        super(index);
        this._tableName = TABLE_NAME;
        this._columnName = COLUMN_NAME;
        this._ordinalPosition = ORDINAL_POSITION;
        this._columnDefault = COLUMN_DEFAULT;
        this._isNullable = IS_NULLABLE;
        this._dataType = DATA_TYPE;
        this._characterMaximumLength = CHARACTER_MAXIMUM_LENGTH;
        this._columnType = COLUMN_TYPE;
        this._columnKey = COLUMN_KEY;
        this._extra = EXTRA;
        this._columnComment = COLUMN_COMMENT;
    }
    get tableName() {
        return this._tableName;
    }
    get table() {
        return this._table;
    }
    set table(table) {
        this._table = table;
    }
    get columnName() {
        return this._columnName;
    }
    get pascalName() {
        return _.upperFirst(this.camelName);
    }
    get camelName() {
        return _.camelCase(this.columnName);
    }
    get phpName() {
        return this.camelName;
    }
    get ordinalPosition() {
        return this._ordinalPosition;
    }
    get columnDefault() {
        return this._columnDefault;
    }
    get isNullable() {
        return this._isNullable !== 'NO';
    }
    get hasDefaultValue() {
        return this._columnDefault !== null;
    }
    get isRequired() {
        return !this.isNullable && !this.hasDefaultValue;
    }
    get isAutoIncrement() {
        return this._extra.lastIndexOf('auto_increment') > -1;
    }
    get dataType() {
        return this._dataType;
    }
    get characterMaximumLength() {
        return this._characterMaximumLength;
    }
    get columnType() {
        return this._columnType;
    }
    get columnKey() {
        return this._columnKey;
    }
    get extra() {
        return this._extra;
    }
    get foreignkey() {
        return this._foreignKey;
    }
    set foreignKey(fk) {
        this._foreignKey = fk;
    }
    get referencedColumn() {
        return this._foreignKey.referencedColumn;
    }
    get referencedTable() {
        return this._foreignKey.referencedTable;
    }
    get columnComment() {
        return this._columnComment;
    }
    static getPhpDataType(type) {
        switch (type) {
            case 'int':
            case 'tinyint':
                return 'int';
            case 'float':
            case 'double':
            case 'decimal':
                return 'float';
            case 'bool':
                return 'boolean';
            case 'date':
            case 'datetime':
            case 'timestamp':
                return 'date'; //¿?
            default:
                return 'string';
        }
    }
    get phpDataType() {
        if (!this._phpDataType) {
            return Column.getPhpDataType(this.dataType);
        }
        return this._phpDataType;
    }
    get isPrimaryKey() {
        return this.columnKey === 'PRI';
    }
    get isForeignKey() {
        return !!this.foreignkey;
    }
    get isEditable() {
        return !this.isAutoIncrement;
    }
    get isUniqueType() {
        return this.columnKey === 'UNI';
    }
    get isUnique() {
        return this.isUniqueType || this.isPrimaryKey;
    }
    get annotations() {
        return this._annotations;
    }
    set annotations(value) {
        this._annotations = value;
    }
}
__decorate([
    Indexable.ToJSON()
], Column.prototype, "tableName", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "table", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "columnName", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "pascalName", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "camelName", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "phpName", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "ordinalPosition", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "columnDefault", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isNullable", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "hasDefaultValue", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isRequired", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isAutoIncrement", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "dataType", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "characterMaximumLength", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "columnType", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "columnKey", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "extra", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "foreignkey", null);
__decorate([
    Indexable.ToJSON(true)
], Column.prototype, "referencedColumn", null);
__decorate([
    Indexable.ToJSON(true)
], Column.prototype, "referencedTable", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "columnComment", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "phpDataType", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isPrimaryKey", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isForeignKey", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isEditable", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isUniqueType", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "isUnique", null);
__decorate([
    Indexable.ToJSON()
], Column.prototype, "annotations", null);
module.exports = Column;
//# sourceMappingURL=column.model.js.map