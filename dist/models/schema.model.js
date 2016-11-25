"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Indexable = require("./indexable.model");
class Schema extends Indexable {
    constructor(schema) {
        super(0);
        this._columns = schema.columns;
        this._tables = schema.tables;
        this._oneToManyRelationships = schema.oneToManyRelationships;
        this._oneToOneRelationships = schema.oneToOneRelationships;
        this._manyToManyRelationships = schema.manyToManyRelationships;
        this._constraints = schema.constraints;
        this._foreignKeys = schema.foreignKeys;
        this._annotations = schema.annotations;
    }
    get columns() {
        return this._columns;
    }
    get tables() {
        return this._tables;
    }
    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    }
    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }
    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    }
    get constraints() {
        return this._constraints;
    }
    get foreignKeys() {
        return this._foreignKeys;
    }
    get annotations() {
        return this._annotations;
    }
}
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "columns", null);
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "tables", null);
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "oneToOneRelationships", null);
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "oneToManyRelationships", null);
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "manyToManyRelationships", null);
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "constraints", null);
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "foreignKeys", null);
__decorate([
    Indexable.ToJSON(false, true)
], Schema.prototype, "annotations", null);
module.exports = Schema;
//# sourceMappingURL=schema.model.js.map