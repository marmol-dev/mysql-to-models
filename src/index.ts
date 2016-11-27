
import mysql = require('mysql');
import SchemaService = require('./services/schema.service');
import IProjectConfig = require('./config/i-project-config');
import path = require('path');
import fs = require('fs');
import Schema = require("./models/schema.model");
import Serializer from "./helpers/serializer";

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

const schemaService = new SchemaService(dbConnection, projectConfig.database, projectConfig);

schemaService.getSchema().then(schema => {
    const serializer = new Serializer(schema);
    const serializedSchema = serializer.serialize();
    const content = JSON.stringify(serializedSchema, null, 4);
    if (outFile !== null) {
        fs.writeFileSync(outFile, content);
        const jsonObj = require(outFile);
        const schema = Schema.fromJSON(jsonObj);
        console.log(schema.tables[0].columns[0].table.tableName);
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
