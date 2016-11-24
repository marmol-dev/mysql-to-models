"use strict";
const DbService = require('./db.service');
const Table = require('../models/table.model');
const OneToXRelationship = require('../models/one_to_x_relationship.model');
const OneToOneRelationship = require('../models/one_to_one_relationship.model');
const OneToManyRelationship = require('../models/one_to_many_relationship.model');
const ManyToManyRelationship = require('../models/many_to_many_relationship.model');
const ColumnsService = require('./columns.service');
const ForeignKeysService = require('./foreign_keys.service');
const ConstraintsService = require('./constraints.service');
class TablesService extends DbService {
    constructor(dbConnection, dbConfig) {
        super(dbConnection, dbConfig);
        this._columnsService = new ColumnsService(dbConnection, dbConfig);
        this._foreignKeysService = new ForeignKeysService(dbConnection, dbConfig);
        this._constraintsService = new ConstraintsService(dbConnection, dbConfig);
    }
    getTables() {
        if (!this._getTablesSql) {
            this._getTablesSql = `SELECT DISTINCT TABLE_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE table_schema = '${this._dbConfig.database}';`;
        }
        return this.query(this._getTablesSql)
            .then(rows => rows.map(row => new Table(row)));
    }
    getTablesWithColumnsAndFKs() {
        return Promise.all([
            this._columnsService.getColumns(),
            this._foreignKeysService.getForeignKeys(),
            this.getTables(),
            this._constraintsService.getConstraints()
        ])
            .then(([columns, foreignKeys, tables, constraints]) => {
            //Bind foreignKey to columns
            columns.forEach(col => {
                col.foreignKey = foreignKeys.find(fk => {
                    return fk.columnName === col.columnName &&
                        fk.tableName === col.tableName;
                });
            });
            //Bind columns to tables and table to columns
            tables.forEach(table => {
                table.columns = columns.filter(col => {
                    return table.tableName === col.tableName;
                });
                table.columns.forEach(column => {
                    column.table = table;
                });
            });
            //Bind table, column, referenced table and referecend column to foreign keys
            foreignKeys.forEach(fk => {
                fk.table = tables.find(table => table.tableName === fk.tableName);
                fk.column = fk.table.columns.find(col => col.columnName === fk.columnName);
                fk.referencedTable = tables.find(table => table.tableName === fk.referencedTableName);
                fk.referencedColumn = fk.referencedTable.columns.find(col => col.columnName === fk.referencedColumnName);
            });
            //Bind constraints to tables
            constraints.forEach(constraint => {
                const table = tables.find(table => table.tableName === constraint.tableName);
                constraint.columns = constraint.columnNames.map(columnName => {
                    return table.columns.find(column => column.columnName === columnName);
                });
                table.constraints.push(constraint);
            });
            const oneToManyRelationships = [];
            const oneToOneRelationships = [];
            const manyToManyRelationships = [];
            {
                const oneToXRelationships = [];
                //Build one-to-x relationships
                foreignKeys.forEach(fk => {
                    let rel = oneToXRelationships.find(rel => rel.name === fk.constraintName);
                    if (!rel) {
                        rel = new OneToXRelationship(fk.constraintName);
                        oneToXRelationships.push(rel);
                    }
                    rel.addForeignKey(fk);
                });
                //Build one-to-many and one-to-one relationships based on uniqueness
                oneToXRelationships.forEach(rel => {
                    const xSideColumns = rel.foreignKeys.map(fk => fk.column);
                    const xSideTable = xSideColumns[0].table;
                    const uniqueConstraint = constraints.find(constraint => {
                        return constraint.table === xSideTable
                            && constraint.constraintType === 'UNIQUE'
                            && constraint.columns.length === xSideColumns.length
                            && constraint.columns.every(col => xSideColumns.lastIndexOf(col) > -1);
                    });
                    if (uniqueConstraint) {
                        oneToOneRelationships.push(OneToOneRelationship.createFromOneToXRelationship(rel));
                    }
                    else {
                        oneToManyRelationships.push(OneToManyRelationship.createFromOneToXRelationship(rel));
                    }
                });
            }
            //Build many-to-many relationships
            oneToManyRelationships.forEach((rel, relIndex) => {
                const relationshipsInvolvingTable = oneToManyRelationships.filter((rel2, rel2Index) => {
                    return rel2Index > relIndex && rel2.manySideTable === rel.manySideTable;
                });
                relationshipsInvolvingTable.forEach(rel2 => {
                    manyToManyRelationships.push(new ManyToManyRelationship(rel, rel2));
                });
            });
            //Bind relationships to tables
            tables.forEach(table => {
                table.oneToManyRelationships = oneToManyRelationships.filter(rel => {
                    return rel.oneSideTable === table ||
                        rel.manySideTable === table;
                });
                table.oneToOneRelationships = oneToOneRelationships.filter(rel => {
                    return rel.oneSideTable === table ||
                        rel.anotherSideTable === table;
                });
                table.manyToManyRelationships = manyToManyRelationships.filter(rel => {
                    return rel.manySide1Table === table ||
                        rel.manySide2Table === table;
                });
            });
            [oneToManyRelationships, oneToOneRelationships, manyToManyRelationships].forEach((XToXRelationships) => {
                const tempXToXRelationships = [...XToXRelationships];
                while (tempXToXRelationships.length > 0) {
                    const currentRelationship = tempXToXRelationships.pop();
                    const sameTablesRels = tempXToXRelationships.filter(rel => {
                        return rel !== currentRelationship
                            && currentRelationship.involvesSameTables(rel);
                    });
                    currentRelationship.numberOfRelationshipsWithSameTables = sameTablesRels.length + 1;
                    currentRelationship.indexInSameTablesRelationships = sameTablesRels.length;
                    sameTablesRels.forEach((rel, index) => {
                        rel.numberOfRelationshipsWithSameTables = sameTablesRels.length + 1;
                        rel.indexInSameTablesRelationships = index;
                        tempXToXRelationships.splice(tempXToXRelationships.lastIndexOf(rel), 1);
                    });
                }
            });
            return tables;
        });
    }
}
module.exports = TablesService;
//# sourceMappingURL=tables.service.js.map