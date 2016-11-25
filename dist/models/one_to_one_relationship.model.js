"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const OneToXRelationship = require('./one_to_x_relationship.model');
const Indexable = require("./indexable.model");
let OneToOneRelationship_1;
let OneToOneRelationship = OneToOneRelationship_1 = class OneToOneRelationship extends OneToXRelationship {
    /**
     * Creates an instance of OneToOneRelationship.
     *
     * @param {string} name The name of the foreign key constraint involved
     *
     */
    constructor(name, index) {
        super(name, index);
    }
    get anotherSideTable() {
        return this.foreignKeys[0].table;
    }
    get oneSideTable() {
        return this.foreignKeys[0].referencedTable;
    }
    /**
     * Name of the relationship from the "another side"
     *
     * @readonly
     * @type {string}
     */
    get relationshipNameFromAnotherSide() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return this.oneSideTable.instanceName + sufix;
    }
    /**
     * Name of the relationship from the "one side"
     *
     * @readonly
     * @type {string}
     */
    get relationshipNameFromOneSide() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return this.anotherSideTable.instanceName + sufix;
    }
    /**
     * Plural name of the relationship from the "another side"
     *
     * @readonly
     * @type {string}
     */
    get pluralRelationshipNameFromAnotherSide() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return this.oneSideTable.pluralInstanceName + sufix;
    }
    /**
     * Name of the relationship from the "one side"
     *
     * @readonly
     * @type {string}
     */
    get pluralRelationshipNameFromOneSide() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return this.anotherSideTable.pluralInstanceName + sufix;
    }
    /**
     * Check if two relationships involves the same tables
     *
     * @param {OneToOneRelationship} rel The relationship to compare
     * @return {boolean} Wether it involves the same tables or not
     */
    involvesSameTables(rel) {
        return (this.oneSideTable === rel.oneSideTable
            &&
                this.anotherSideTable === rel.anotherSideTable)
            || (this.oneSideTable === rel.anotherSideTable
                &&
                    this.anotherSideTable === rel.anotherSideTable);
    }
    get isBetweenEntities() {
        return this.oneSideTable.isEntity &&
            this.anotherSideTable.isEntity;
    }
    getNameFromSide(side) {
        if (side === this.anotherSideTable) {
            return this.relationshipNameFromAnotherSide;
        }
        else {
            return this.relationshipNameFromOneSide;
        }
    }
    getPluralNameFromSide(side) {
        if (side === this.anotherSideTable) {
            return this.pluralRelationshipNameFromAnotherSide;
        }
        else {
            return this.pluralRelationshipNameFromOneSide;
        }
    }
    /**
     * Creates a OneToOneRelationship from a One
     *
     * @static
     * @param {OneToXRelationship} rel The OneToXRelationship instance
     * @returns {OneToOneRelationship} The relationship
     */
    static createFromOneToXRelationship(rel, index) {
        const toret = new OneToOneRelationship_1(rel.name, index);
        toret.foreignKeys = [...rel.foreignKeys];
        return toret;
    }
};
__decorate([
    Indexable.ToJSON()
], OneToOneRelationship.prototype, "anotherSideTable", null);
__decorate([
    Indexable.ToJSON()
], OneToOneRelationship.prototype, "oneSideTable", null);
__decorate([
    Indexable.ToJSON()
], OneToOneRelationship.prototype, "relationshipNameFromAnotherSide", null);
__decorate([
    Indexable.ToJSON()
], OneToOneRelationship.prototype, "relationshipNameFromOneSide", null);
__decorate([
    Indexable.ToJSON()
], OneToOneRelationship.prototype, "pluralRelationshipNameFromAnotherSide", null);
__decorate([
    Indexable.ToJSON()
], OneToOneRelationship.prototype, "pluralRelationshipNameFromOneSide", null);
__decorate([
    Indexable.ToJSON()
], OneToOneRelationship.prototype, "isBetweenEntities", null);
OneToOneRelationship = OneToOneRelationship_1 = __decorate([
    Indexable.CollectionName("oneToOneRelationships")
], OneToOneRelationship);
module.exports = OneToOneRelationship;
//# sourceMappingURL=one_to_one_relationship.model.js.map