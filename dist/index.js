"use strict";
const mysql = require('mysql');
const TablesService = require('./services/tables.service');
const path = require('path');
let projectConfig;
try {
    const file = path.resolve(__dirname, "..", process.argv[2]);
    projectConfig = require(file);
}
catch (e) {
    console.error("Error opening config file", e);
    process.exit();
}
let dbConnection = mysql.createConnection(projectConfig.database);
dbConnection.connect();
const tablesService = new TablesService(dbConnection, projectConfig.database);
tablesService.getTablesWithColumnsAndFKs().then(tables => {
    console.log(JSON.stringify(tables));
});
process.on('unhandledRejection', (reason) => {
    console.log('Reason: ' + reason);
    if (reason instanceof Error) {
        console.error(reason.stack);
    }
});
dbConnection.end();
//# sourceMappingURL=index.js.map