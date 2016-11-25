"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const _ = require('lodash');
const NamesHelper = require('../helpers/names.helper');
const serializable_1 = require('../helpers/serializable');
let Table = class Table {
    constructor({ TABLE_NAME, TABLE_TYPE, TABLE_COMMENT }, index) {
        this._index = index;
        this._tableName = TABLE_NAME;
        this._constraints = [];
        this._tableType = TABLE_TYPE;
        this._tableComment = TABLE_COMMENT;
    }
    get tableName() {
        return this._tableName;
    }
    get tableType() {
        return this._tableType;
    }
    get tableComment() {
        return this._tableComment;
    }
    get columns() {
        return this._columns;
    }
    get sortedColumns() {
        return this._columns;
    }
    get pascalName() {
        return _.upperFirst(this.camelName);
    }
    get pluralPascalName() {
        return NamesHelper.plural(this.pascalName);
    }
    get modelName() {
        return this.pascalName;
    }
    get camelName() {
        return _.camelCase(this.tableName);
    }
    get instanceName() {
        return this.camelName;
    }
    get pluralCamelName() {
        return NamesHelper.plural(this.camelName);
    }
    get pluralInstanceName() {
        return this.pluralCamelName;
    }
    set columns(columns) {
        this._columns = columns.sort((c1, c2) => {
            const pos1 = parseInt(c1.ordinalPosition);
            const pos2 = parseInt(c2.ordinalPosition);
            if (pos1 < pos2)
                return -1;
            else if (pos2 > pos1)
                return 1;
            else
                return 0;
        });
    }
    get primaryKeyColumns() {
        return this._columns.filter(column => column.isPrimaryKey);
    }
    get isEntity() {
        return true;
        //return !this.columns.every(column => column.isForeignKey);
    }
    get oneToOneRelationships() {
        return this._oneToOneRelationships;
    }
    set oneToOneRelationships(relationships) {
        this._oneToOneRelationships = relationships;
    }
    get oneToManyRelationships() {
        return this._oneToManyRelationships;
    }
    get oneToOneEntityRelationships() {
        return this.oneToOneRelationships.filter(rel => rel.isBetweenEntities);
    }
    set oneToManyRelationships(relationships) {
        this._oneToManyRelationships = relationships;
    }
    get oneToManyEntityRelationships() {
        return this.oneToManyRelationships.filter(rel => rel.isBetweenEntities);
    }
    get manyToManyRelationships() {
        return this._manyToManyRelationships;
    }
    set manyToManyRelationships(relationships) {
        this._manyToManyRelationships = relationships;
    }
    get manyToManyEntityRelationships() {
        return this.manyToManyRelationships.filter(rel => rel.isBetweenEntities);
    }
    get relatedTables() {
        const relatedTables = [];
        const appendFunction = (t) => {
            if (t !== this && relatedTables.lastIndexOf(t) === -1) {
                relatedTables.push(t);
            }
        };
        this.oneToOneRelationships.forEach(rel => {
            [rel.oneSideTable, rel.anotherSideTable].forEach(appendFunction);
        });
        this.oneToManyRelationships.forEach(rel => {
            [rel.oneSideTable, rel.manySideTable].forEach(appendFunction);
        });
        this.manyToManyRelationships.forEach(rel => {
            [rel.manySide1Table, rel.manySide2Table, rel.innerTable].forEach(appendFunction);
        });
        return relatedTables;
    }
    get foreignKeysRelatedTables() {
        const toret = [];
        [...this.oneToOneRelationships, ...this.oneToManyRelationships].forEach((rel) => {
            if (rel.foreignKeys[0].table === this) {
                if (toret.lastIndexOf(rel.foreignKeys[0].referencedTable) === -1) {
                    toret.push(rel.foreignKeys[0].referencedTable);
                }
            }
        });
        return toret;
    }
    get relatedEntityTables() {
        return this.relatedTables.filter(t => t.isEntity);
    }
    get constraints() {
        return this._constraints;
    }
    /**
     * Get constraints removing the unique constraints that has a priamary key constraint involving the same columns
     *
     * @readonly
     *
     * @memberOf Table
     */
    get nonRepeatedConstraints() {
        return this.constraints.filter(cons => {
            return !cons.isUniqueType || !this.primaryKeyConstraints.find(pkCons => pkCons.involvesColumns(cons.columns));
        });
    }
    get uniqueConstraints() {
        return this._constraints.filter(cons => cons.isUniqueType);
    }
    get nonRepeatedUniqueConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniqueType);
    }
    get uniquenessConstraints() {
        return this._constraints.filter(cons => cons.isUniquenessType);
    }
    get nonRepeatedUniquenessConstraints() {
        return this.nonRepeatedConstraints.filter(cons => cons.isUniquenessType);
    }
    get primaryKeyConstraints() {
        return this._constraints.filter(cons => cons.isPrimaryKeyType);
    }
    set constraints(c) {
        this._constraints = c;
    }
    get annotations() {
        return this._annotations;
    }
    set annotations(value) {
        this._annotations = value;
    }
};
__decorate([
    serializable_1.Construct()
], Table.prototype, "_tableName", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_columns", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_constraints", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_oneToOneRelationships", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_oneToManyRelationships", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_manyToManyRelationships", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_tableType", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_tableComment", void 0);
__decorate([
    serializable_1.Construct()
], Table.prototype, "_annotations", void 0);
__decorate([
    serializable_1.Id()
], Table.prototype, "_index", void 0);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "tableName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "tableType", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "tableComment", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "columns", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "sortedColumns", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "pascalName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "pluralPascalName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "modelName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "camelName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "instanceName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "pluralCamelName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "pluralInstanceName", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "primaryKeyColumns", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "isEntity", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "oneToOneRelationships", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "oneToManyRelationships", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "oneToOneEntityRelationships", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "oneToManyEntityRelationships", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "manyToManyRelationships", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "manyToManyEntityRelationships", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "relatedTables", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "foreignKeysRelatedTables", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "relatedEntityTables", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "constraints", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "nonRepeatedConstraints", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "uniqueConstraints", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "nonRepeatedUniqueConstraints", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "uniquenessConstraints", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "nonRepeatedUniquenessConstraints", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "primaryKeyConstraints", null);
__decorate([
    serializable_1.Serialize()
], Table.prototype, "annotations", null);
Table = __decorate([
    serializable_1.Serializable()
], Table);
module.exports = Table;
//# sourceMappingURL=table.model.js.map