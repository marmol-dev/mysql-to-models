"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Indexable = require('./indexable.model');
class Entity extends Indexable {
    constructor(_table, index) {
        super(index);
        this._table = _table;
    }
    get hasTitleColumn() {
        return !!this.titleColumn;
    }
    get titleColumn() {
        return this._table.sortedColumns.find(col => {
            return !col.isPrimaryKey && !col.isForeignKey && col.phpDataType === 'string';
        });
    }
    get hasTitle() {
        return this.hasTitleColumn;
    }
    get title() {
        if (this.hasTitleColumn) {
            return this.titleColumn.pascalName;
        }
        return null;
    }
    get table() {
        return this._table;
    }
    get attributes() {
        return this.table.columns.filter(c => {
            return !c.isForeignKey || c.isPrimaryKey;
        });
    }
    get listAttributes() {
        return this.attributes.filter(attr => attr.dataType !== 'blob');
    }
}
__decorate([
    Indexable.ToJSON()
], Entity.prototype, "hasTitleColumn", null);
__decorate([
    Indexable.ToJSON()
], Entity.prototype, "titleColumn", null);
__decorate([
    Indexable.ToJSON()
], Entity.prototype, "hasTitle", null);
__decorate([
    Indexable.ToJSON()
], Entity.prototype, "title", null);
__decorate([
    Indexable.ToJSON()
], Entity.prototype, "table", null);
__decorate([
    Indexable.ToJSON()
], Entity.prototype, "attributes", null);
__decorate([
    Indexable.ToJSON()
], Entity.prototype, "listAttributes", null);
module.exports = Entity;
//# sourceMappingURL=entity.model.js.map