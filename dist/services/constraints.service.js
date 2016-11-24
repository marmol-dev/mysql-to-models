"use strict";
const DbService = require('./db.service');
const Constraint = require('../models/constraint.model');
class ConstraintsService extends DbService {
    constructor(dbConnection, dbConfig) {
        super(dbConnection, dbConfig);
    }
    getConstraints() {
        const sql = `SELECT *
                FROM information_schema.table_constraints t
                LEFT JOIN information_schema.key_column_usage k
                USING(constraint_name, table_schema,table_name)
                WHERE t.table_schema='${this._dbConfig.database}';`;
        return this.query(sql)
            .then(rows => {
            const constraints = [];
            rows.forEach(row => {
                let constraint = constraints.find(constraint => {
                    return constraint.constraintName === row.CONSTRAINT_NAME
                        && constraint.tableName === row.TABLE_NAME;
                });
                if (!constraint) {
                    constraint = new Constraint(row, constraints.length);
                    constraints.push(constraint);
                }
                constraint.addColumnName(row.COLUMN_NAME);
            });
            return constraints;
        });
    }
}
module.exports = ConstraintsService;
//# sourceMappingURL=constraints.service.js.map