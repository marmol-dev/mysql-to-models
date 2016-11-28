
import mysql = require('mysql');
import SchemaService = require('../lib/services/schema.service');
import IProjectConfig = require('../lib/config/i-project-config');
import path = require('path');
import fs = require('fs');
import Schema = require("../lib/models/schema.model");
import {Serializer} from "xserializer";

export function run(argv: {config: string, output: string}) {

    if (process.argv.length < 3) {
        console.error(`Usage: mysql-to-models <config>.json [<models>.json]`);
        process.exit();
    }

    let projectConfig: IProjectConfig;

    try {
        const file = path.resolve(process.cwd(), argv.config);
        projectConfig = require(file);
    } catch (e) {
        console.error("Error opening config file", e);
        process.exit();
    }

    const outFile = path.resolve(process.cwd(),argv.output);

    const dbConnection = mysql.createConnection(projectConfig.database);

    dbConnection.connect();

    const schemaService = new SchemaService(dbConnection, projectConfig.database, projectConfig);

    schemaService.getSchema().then(schema => {
        const serializer = new Serializer(schema);
        const serializedSchema = serializer.serialize();
        const content = JSON.stringify(serializedSchema, null, 4);
        if (outFile !== null) {
            fs.writeFileSync(outFile, content);
            console.info(`Output file successfully saved in "${outFile}"`);
        } else {
            process.stdout.write(content);
        }
    });

    process.on('unhandledRejection', (reason: any) => {
        console.log('Reason: ' + reason);
        if (reason instanceof Error) {
            console.error(reason.stack);
        }
    });

    dbConnection.end();
}
