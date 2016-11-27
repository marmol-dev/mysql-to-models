"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const serializable_1 = require("../helpers/serializable");
const deserializable_1 = require("../helpers/deserializable");
let Annotation = class Annotation {
    constructor(_name, _values, _index) {
        Object.assign(this, { _name: _name, _values: _values, _index: _index });
    }
    get hasValues() {
        return this._values !== null;
    }
    get table() {
        return this._table;
    }
    get column() {
        return this._column;
    }
    get foreignKey() {
        return this._foreignKey;
    }
    get name() {
        return this._name;
    }
    get values() {
        return this._values;
    }
    set table(value) {
        this._table = value;
    }
    set column(value) {
        this._column = value;
    }
    set foreignKey(value) {
        this._foreignKey = value;
    }
};
__decorate([
    deserializable_1.Deserialize()
], Annotation.prototype, "_table", void 0);
__decorate([
    deserializable_1.Deserialize()
], Annotation.prototype, "_column", void 0);
__decorate([
    deserializable_1.Deserialize()
], Annotation.prototype, "_foreignKey", void 0);
__decorate([
    deserializable_1.Deserialize()
], Annotation.prototype, "_name", void 0);
__decorate([
    deserializable_1.Deserialize()
], Annotation.prototype, "_values", void 0);
__decorate([
    deserializable_1.Deserialize()
], Annotation.prototype, "_index", void 0);
__decorate([
    serializable_1.Serialize()
], Annotation.prototype, "table", null);
__decorate([
    serializable_1.Serialize()
], Annotation.prototype, "column", null);
__decorate([
    serializable_1.Serialize()
], Annotation.prototype, "foreignKey", null);
__decorate([
    serializable_1.Serialize()
], Annotation.prototype, "name", null);
__decorate([
    serializable_1.Serialize()
], Annotation.prototype, "values", null);
Annotation = __decorate([
    serializable_1.Serializable(),
    deserializable_1.Deserializable()
], Annotation);
module.exports = Annotation;
//# sourceMappingURL=annotation.model.js.map