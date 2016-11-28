import DbService = require('./db.service');

import Column = require('../models/column.model');
import Table = require('../models/table.model');

import mysql = require('mysql');

class ColumnsService extends DbService {

    private _getColumnsSql : string;

    constructor(dbConnection: mysql.IConnection, dbConfig: any) {
        super(dbConnection, dbConfig);
    }

    getColumns() {
        if (!this._getColumnsSql) {
            this._getColumnsSql = `SELECT *
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE table_schema = '${this._dbConfig.database}';`;
        }

        return this.query(this._getColumnsSql)
            .then(rows => 
                rows.map((row, index) => 
                    new Column(row, index)
                )
            );
    }
}

export = ColumnsService;