"use strict";
const _ = require('lodash');
class Schema {
    constructor(schema) {
        this._columns = schema.columns;
        this._tables = schema.tables;
        this._oneToManyRelationships = schema.oneToManyRelationships;
        this._oneToOneRelationships = schema.oneToOneRelationships;
        this._manyToManyRelationships = schema.manyToManyRelationships;
        this._constraints = schema.constraints;
        this._foreignKeys = schema.foreignKeys;
        this._entities = schema.entities;
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
    get entities() {
        return this._entities;
    }
    toJSON() {
        return _.pick(this, 'entities', 'foreignKeys', 'constraints', 'manyToManyRelationships', 'oneToManyRelationships', 'oneToOneRelationships', 'tables', 'columns');
    }
}
module.exports = Schema;
//# sourceMappingURL=schema.model.js.map