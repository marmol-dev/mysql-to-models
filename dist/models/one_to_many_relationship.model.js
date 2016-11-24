"use strict";
const OneToXRelationship = require('./one_to_x_relationship.model');
class OneToManyRelationship extends OneToXRelationship {
    /**
     * Creates an instance of OneToManyRelationship.
     *
     * @param {string} name The name of the fk involved
     *
     */
    constructor(name) {
        super(name);
    }
    /**
     * Gets the "many side" table
     *
     * @readonly
     * @type {Table}
     */
    get manySideTable() {
        return this.foreignKeys[0].table;
    }
    /**
     * Gets the "one side" table
     *
     * @readonly
     * @type {Table}
     */
    get oneSideTable() {
        return this.foreignKeys[0].referencedTable;
    }
    /**
     * Name of the relationship from the "many side"
     *
     * @readonly
     * @type {string}
     */
    get relationshipNameFromManySide() {
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
        return this.manySideTable.instanceName + sufix;
    }
    /**
     * Plural name of the relationship from the "many side"
     *
     * @readonly
     * @type {string}
     */
    get pluralRelationshipNameFromManySide() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return this.oneSideTable.pluralInstanceName + sufix;
    }
    /**
     * Plural name of the relationship from the "one side"
     *
     * @readonly
     * @type {string}
     */
    get pluralRelationshipNameFromOneSide() {
        let sufix = '';
        if (this.numberOfRelationshipsWithSameTables > 1) {
            sufix = this.indexInSameTablesRelationships.toString();
        }
        return this.manySideTable.pluralInstanceName + sufix;
    }
    /**
     * Check if two relationships involves the same tables
     *
     * @param {OneToManyRelationship} rel The relationship to compare
     * @return {boolean} Wether it involves the same tables or not
     */
    involvesSameTables(rel) {
        return (this.oneSideTable === rel.oneSideTable
            &&
                this.manySideTable === rel.manySideTable)
            || (this.oneSideTable === rel.manySideTable
                &&
                    this.manySideTable === rel.oneSideTable);
    }
    get isBetweenEntities() {
        return this.oneSideTable.isEntity &&
            this.manySideTable.isEntity;
    }
    getNameFromSide(side) {
        if (side === this.manySideTable) {
            return this.relationshipNameFromManySide;
        }
        else {
            return this.relationshipNameFromOneSide;
        }
    }
    getPluralNameFromSide(side) {
        if (side === this.manySideTable) {
            return this.pluralRelationshipNameFromManySide;
        }
        else {
            return this.pluralRelationshipNameFromOneSide;
        }
    }
    /**
     * Creates a OneToManyRelationship from a OneToXRelationship
     *
     * @static
     * @param {OneToXRelationship} rel The one-to-x relationship
     * @returns {OneToManyRelationship} The one-to-many relationship
     *
     * @memberOf OneToManyRelationship
     */
    static createFromOneToXRelationship(rel) {
        const toret = new OneToManyRelationship(rel.name);
        toret.foreignKeys = [...rel.foreignKeys];
        return toret;
    }
}
module.exports = OneToManyRelationship;
//# sourceMappingURL=one_to_many_relationship.model.js.map