"use strict";
const DbService = require('./db.service');
const Column = require('../models/column.model');
class ColumnsService extends DbService {
    constructor(dbConnection, dbConfig) {
        super(dbConnection, dbConfig);
    }
    getColumns() {
        if (!this._getColumnsSql) {
            this._getColumnsSql = `SELECT *
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE table_schema = '${this._dbConfig.database}';`;
        }
        return this.query(this._getColumnsSql)
            .then(rows => rows.map((row, index) => new Column(row, index)));
    }
}
module.exports = ColumnsService;
//# sourceMappingURL=columns.service.js.map