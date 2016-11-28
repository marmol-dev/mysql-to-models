"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Column = require('./column.model');
const Table = require('./table.model');
const OneToOneRelationship = require('./one_to_one_relationship.model');
const OneToManyRelationship = require('./one_to_many_relationship.model');
const ManyToManyRelationship = require('./many_to_many_relationship.model');
const Constraint = require('./constraint.model');
const ForeignKey = require('./foreign_key.model');
const Annotation = require("./annotation.model");
const xserializer_1 = require("xserializer");
function classProvider(name) {
    function NullClass() { }
    NullClass.prototype = null;
    switch (name) {
        case null:
            return NullClass;
        case 'Object':
            return Object;
        case 'Table':
            return Table;
        case 'Column':
            return Column;
        case 'Annotation':
            return Annotation;
        case 'Constraint':
            return Constraint;
        case 'ForeignKey':
            return ForeignKey;
        case 'ManyToManyRelationship':
            return ManyToManyRelationship;
        case 'OneToManyRelationship':
            return OneToManyRelationship;
        case 'OneToOneRelationship':
            return OneToOneRelationship;
        case 'Schema':
            return Schema;
        default:
            throw new Error(`Provider doesn't found a class with name ${name}`);
    }
}
let Schema = class Schema {
    constructor(schema) {
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
    static fromJSON(obj) {
        const deserializer = new xserializer_1.Deserializer(obj);
        deserializer.constructorProvider = classProvider;
        return deserializer.deserialize();
    }
};
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_columns", void 0);
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_tables", void 0);
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_oneToOneRelationships", void 0);
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_oneToManyRelationships", void 0);
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_manyToManyRelationships", void 0);
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_constraints", void 0);
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_foreignKeys", void 0);
__decorate([
    xserializer_1.Deserialize()
], Schema.prototype, "_annotations", void 0);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "columns", null);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "tables", null);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "oneToOneRelationships", null);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "oneToManyRelationships", null);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "manyToManyRelationships", null);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "constraints", null);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "foreignKeys", null);
__decorate([
    xserializer_1.Serialize()
], Schema.prototype, "annotations", null);
Schema = __decorate([
    xserializer_1.Deserializable(),
    xserializer_1.Serializable()
], Schema);
module.exports = Schema;
//# sourceMappingURL=schema.model.js.map