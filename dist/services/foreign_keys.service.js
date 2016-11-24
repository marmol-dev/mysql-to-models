"use strict";
const DbService = require('./db.service');
const ForeignKey = require('../models/foreign_key.model');
class ForeignKeysService extends DbService {
    constructor(dbConnection, dbConfig) {
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
module.exports = ForeignKeysService;
//# sourceMappingURL=foreign_keys.service.js.map