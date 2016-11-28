import mysql = require('mysql');

class DbService {
    protected _dbConnection : mysql.IConnection;
    protected _dbConfig : any;

    constructor(dbConnection : mysql.IConnection, dbConfig: any) {
        this._dbConnection = dbConnection;
        this._dbConfig = dbConfig;
    }

    query(sql : string) : Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._dbConnection.query(sql, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    }
}

export = DbService;