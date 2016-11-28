"use strict";
const mysql = require('mysql');
const SchemaService = require('./services/schema.service');
const path = require('path');
const fs = require('fs');
const xserializer_1 = require("xserializer");
if (process.argv.length < 3) {
    console.error(`Usage: mysqltomodels <config>.json [<models>.json]`);
    process.exit();
}
let projectConfig;
try {
    const file = path.resolve(process.cwd(), process.argv[2]);
    projectConfig = require(file);
}
catch (e) {
    console.error("Error opening config file", e);
    process.exit();
}
const outFile = process.argv.length > 3 ? path.resolve(process.cwd(), process.argv[3]) : null;
const dbConnection = mysql.createConnection(projectConfig.database);
dbConnection.connect();
const schemaService = new SchemaService(dbConnection, projectConfig.database, projectConfig);
schemaService.getSchema().then(schema => {
    const serializer = new xserializer_1.Serializer(schema);
    const serializedSchema = serializer.serialize();
    const content = JSON.stringify(serializedSchema, null, 4);
    if (outFile !== null) {
        fs.writeFileSync(outFile, content);
        console.info(`Output file successfully saved in "${outFile}"`);
    }
    else {
        process.stdout.write(content);
    }
});
process.on('unhandledRejection', (reason) => {
    console.log('Reason: ' + reason);
    if (reason instanceof Error) {
        console.error(reason.stack);
    }
});
dbConnection.end();
//# sourceMappingURL=index.js.map