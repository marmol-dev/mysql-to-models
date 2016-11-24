import mysql = require('mysql');
import SchemaService = require('./services/schema.service');
import IProjectConfig = require('./config/i-project-config');
import path = require('path');
import fs = require('fs');

let projectConfig : IProjectConfig;

try {
    const file = path.resolve(__dirname, "..", process.argv[2]);
    projectConfig = require(file);
} catch(e) {
    console.error("Error opening config file", e);
    process.exit();
}

const outFile = process.argv.length > 3 ? path.resolve(__dirname, "..", process.argv[3]) : null;

const dbConnection = mysql.createConnection(projectConfig.database);

dbConnection.connect();

const schemaService = new SchemaService(dbConnection, projectConfig.database);

schemaService.getSchema().then(schema => {
    const content = JSON.stringify(schema, null, 4);
    if (outFile !== null) {
        fs.writeFileSync(outFile, content);
    } else {
        process.stdout.write(content);
    }
});

process.on('unhandledRejection', (reason : any) => {
    console.log('Reason: ' + reason);
    if (reason instanceof Error) {
        console.error(reason.stack);
    }
});

dbConnection.end();