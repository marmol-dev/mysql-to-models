import DbService = require('./db.service');
import ForeignKey = require('../models/foreign_key.model');
import mysql = require('mysql');

class ForeignKeysService extends DbService {

    private _getTablesSql : string;

    constructor(dbConnection: mysql.IConnection, dbConfig: any) {
        super(dbConnection, dbConfig);
    }

    getForeignKeys() {
        if (!this._getTablesSql) {
            this._getTablesSql = `select
                TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
                from INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE constraint_schema = '${this._dbConfig.database}' AND REFERENCED_TABLE_NAME IS NOT NULL;`;
        }

        return this.query(this._getTablesSql)
            .then(rows => {
                return rows.map(row => new ForeignKey(row));
            });
    }
}

export = ForeignKeysService;