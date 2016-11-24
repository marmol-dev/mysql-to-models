"use strict";
class DbService {
    constructor(dbConnection, dbConfig) {
        this._dbConnection = dbConnection;
        this._dbConfig = dbConfig;
    }
    query(sql) {
        return new Promise((resolve, reject) => {
            this._dbConnection.query(sql, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}
module.exports = DbService;
//# sourceMappingURL=db.service.js.map