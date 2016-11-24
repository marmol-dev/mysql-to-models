import DbService = require('./db.service');

import Table = require('../models/table.model');
import Schema = require("../models/schema.model");

import OneToXRelationship = require('../models/one_to_x_relationship.model');
import OneToOneRelationship = require('../models/one_to_one_relationship.model');
import OneToManyRelationship = require('../models/one_to_many_relationship.model');
import ManyToManyRelationship = require('../models/many_to_many_relationship.model');
import Relationship = require('../models/relationship.model');

import ColumnsService = require('./columns.service');
import ForeignKeysService = require('./foreign_keys.service');
import ConstraintsService = require('./constraints.service');
import TablesService = require('./tables.service');

import mysql = require('mysql');

class SchemaService extends DbService {

    private _columnsService : ColumnsService;
    private _foreignKeysService : ForeignKeysService;
    private _constraintsService : ConstraintsService;
    private _tablesService : TablesService;

    constructor(dbConnection: mysql.IConnection, dbConfig: any) {
        super(dbConnection, dbConfig);
        this._columnsService = new ColumnsService(dbConnection, dbConfig);
        this._foreignKeysService = new ForeignKeysService(dbConnection, dbConfig);
        this._constraintsService = new ConstraintsService(dbConnection, dbConfig);
        this._tablesService = new TablesService(dbConnection, dbConfig);
    }

    getSchema() : Promise<Schema>{
        
        return Promise.all([
            this._columnsService.getColumns(),
            this._foreignKeysService.getForeignKeys(),
            this._tablesService.getTables(),
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


                const oneToManyRelationships: OneToManyRelationship[] = [];
                const oneToOneRelationships: OneToOneRelationship[] = [];
                const manyToManyRelationships: ManyToManyRelationship[] = [];

                {
                    const oneToXRelationships: OneToXRelationship[] = [];
                    
                    //Build one-to-x relationships
                    foreignKeys.forEach(fk => {
                        let rel = oneToXRelationships.find(rel => rel.name === fk.constraintName);
                            
                        if (!rel) {
                            rel = new OneToXRelationship(fk.constraintName, oneToXRelationships.length);
                            oneToXRelationships.push(rel);
                        }

                        rel.addForeignKey(fk);
                    });

                    //Build one-to-many and one-to-one relationships based on uniqueness
                    oneToXRelationships.forEach(rel => {

                        const xSideColumns =  rel.foreignKeys.map(fk => fk.column);
                        const xSideTable = xSideColumns[0].table;

                        const uniqueConstraint = constraints.find(constraint => {
                            return constraint.table === xSideTable 
                                && constraint.constraintType === 'UNIQUE'
                                && constraint.columns.length === xSideColumns.length
                                && constraint.columns.every(col => xSideColumns.lastIndexOf(col) > -1);
                        });

                        if (uniqueConstraint) {
                            oneToOneRelationships.push(OneToOneRelationship.createFromOneToXRelationship(rel, oneToOneRelationships.length));
                        } else {
                            oneToManyRelationships.push(OneToManyRelationship.createFromOneToXRelationship(rel, oneToManyRelationships.length));
                        }

                    });
                }

                //Build many-to-many relationships
                oneToManyRelationships.forEach((rel, relIndex) => {
                    const relationshipsInvolvingTable = oneToManyRelationships.filter((rel2, rel2Index) => {
                        return rel2Index > relIndex && rel2.manySideTable === rel.manySideTable;
                    });

                    relationshipsInvolvingTable.forEach(rel2 => {
                        manyToManyRelationships.push(new ManyToManyRelationship(rel, rel2, manyToManyRelationships.length));
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

                [oneToManyRelationships, oneToOneRelationships, manyToManyRelationships].forEach((XToXRelationships:Relationship[]) => {
                    const tempXToXRelationships = [...XToXRelationships];

                    while(tempXToXRelationships.length > 0) {
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


                return new Schema({
                    oneToOneRelationships,
                    oneToManyRelationships,
                    manyToManyRelationships,
                    tables,
                    columns,
                    foreignKeys,
                    constraints
                });
            });
    }
}

export = SchemaService;