"use strict";
const Relationship = require('./relationship.model');
const _ = require('lodash');
class ManyToManyRelationship extends Relationship {
    constructor(relationship1, relationship2) {
        super();
        this._relationship1 = relationship1;
        this._relationship2 = relationship2;
    }
    get relationship1() {
        return this._relationship1;
    }
    get relationship2() {
        return this._relationship2;
    }
    /**
     * First "many side" table
     *
     * @readonly
     * @type {Table}
     */
    get manySide1Table() {
        return this._relationship1.oneSideTable;
    }
    /**
     * Second "many side" table
     *
     * @readonly
     * @type {Table}
     */
    get manySide2Table() {
        return this._relationship2.oneSideTable;
    }
    /**
     * Inner table
     *
     * @readonly
     * @description The table create to join the many-to-many relationship
     * @type {Table}
     */
    get innerTable() {
        return this._relationship1.manySideTable;
    }
    get relationshipNameFromManySide2() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.manySide1Table.instanceName}In${_.upperFirst(this.innerTable.instanceName)}${sufix}`;
    }
    get relationshipNameFromManySide1() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.manySide2Table.instanceName}In${_.upperFirst(this.innerTable.instanceName)}${sufix}`;
    }
    get pluralRelationshipNameFromManySide2() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.manySide1Table.pluralInstanceName}In${_.upperFirst(this.innerTable.instanceName)}${sufix}`;
    }
    get pluralRelationshipNameFromManySide1() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.manySide2Table.pluralInstanceName}In${_.upperFirst(this.innerTable.instanceName)}${sufix}`;
    }
    get innerRelationshipNameFromManySide2() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.innerTable.instanceName}With${_.upperFirst(this.manySide1Table.instanceName)}${sufix}`;
    }
    get innerRelationshipNameFromManySide1() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.innerTable.instanceName}With${_.upperFirst(this.manySide2Table.instanceName)}${sufix}`;
    }
    get pluralInnerRelationshipNameFromManySide2() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.innerTable.pluralInstanceName}With${_.upperFirst(this.manySide1Table.pluralInstanceName)}${sufix}`;
    }
    get pluralInnerRelationshipNameFromManySide1() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return `${this.innerTable.pluralInstanceName}With${_.upperFirst(this.manySide2Table.pluralInstanceName)}${sufix}`;
    }
    getNameFromSide(side) {
        if (side === this.manySide1Table) {
            return this.relationshipNameFromManySide1;
        }
        else {
            return this.relationshipNameFromManySide2;
        }
    }
    getPluralNameFromSide(side) {
        if (side === this.manySide1Table) {
            return this.pluralRelationshipNameFromManySide1;
        }
        else {
            return this.pluralRelationshipNameFromManySide2;
        }
    }
    getInnerNameFromSide(side) {
        if (side === this.manySide1Table) {
            return this.innerRelationshipNameFromManySide1;
        }
        else {
            return this.innerRelationshipNameFromManySide2;
        }
    }
    getPluralInnerNameFromSide(side) {
        if (side === this.manySide1Table) {
            return this.pluralInnerRelationshipNameFromManySide1;
        }
        else {
            return this.pluralInnerRelationshipNameFromManySide2;
        }
    }
    get isBetweenEntities() {
        return this.manySide1Table.isEntity &&
            this.manySide2Table.isEntity;
    }
    /**
     * Check if two relationships involves the same tables
     *
     * @param {ManyToManyRelationship} rel The relationship to compare
     * @return {boolean} Wether it involves the same tables or not
     */
    involvesSameTables(rel) {
        return this.innerTable === rel.innerTable
            && ((this.manySide1Table === rel.manySide1Table
                &&
                    this.manySide2Table === rel.manySide2Table)
                || (this.manySide1Table === rel.manySide2Table
                    &&
                        this.manySide2Table === rel.manySide1Table));
    }
}
module.exports = ManyToManyRelationship;
//# sourceMappingURL=many_to_many_relationship.model.js.map