import OneToXRelationship = require('./one_to_x_relationship.model');
import Table = require('./table.model');

class OneToOneRelationship extends OneToXRelationship {

    /**
     * Creates an instance of OneToOneRelationship.
     * 
     * @param {string} name The name of the foreign key constraint involved
     * 
     */
    constructor(name : string) {
        super(name);
    }

    //lado otro
    get anotherSideTable() {
        return this.foreignKeys[0].table;
    }

    //lado uno
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
        let sufix  = '';

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
        let sufix  = '';

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
        let sufix  = '';

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
        let sufix  = '';

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
    involvesSameTables(rel : OneToOneRelationship) {
        return (
                this.oneSideTable === rel.oneSideTable
                &&
                this.anotherSideTable === rel.anotherSideTable
            )
            || (
                this.oneSideTable === rel.anotherSideTable
                &&
                this.anotherSideTable === rel.anotherSideTable
            );
    }

    get isBetweenEntities() {
        return this.oneSideTable.isEntity &&
            this.anotherSideTable.isEntity;
    }

    getNameFromSide(side: Table) {
        if (side === this.anotherSideTable) {
            return this.relationshipNameFromAnotherSide;
        } else {
            return this.relationshipNameFromOneSide;
        }
    }

    getPluralNameFromSide(side: Table) {
        if (side === this.anotherSideTable) {
            return this.pluralRelationshipNameFromAnotherSide;
        } else {
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
    static createFromOneToXRelationship(rel : OneToXRelationship){
        const toret = new OneToOneRelationship(rel.name);

        toret.foreignKeys = [...rel.foreignKeys];

        return toret;
    }
}

export = OneToOneRelationship;