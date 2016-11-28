import * as inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';

export function run() {
    const questions = [
        {
            name: 'configFileName',
            message: 'Enter the config file name',
            default: 'config.json'
        },
        {
            name: 'host',
            message: 'Enter the database host',
            default: 'localhost'
        },
        {
            name: 'database',
            message: 'Enter the database name'
        },
        {
            name: 'user',
            message: 'Enter the database user',
            default: 'root'
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter the database password',
            default: ''
        }
    ];

    inquirer.prompt(questions).then(({configFileName, host, database, user, password}) => {
        const config = {
            minVersion: '0.0.1',
            database: {
                host,
                database,
                user,
                password
            }
        };

        const configFileDir = path.resolve(process.cwd(), configFileName);
        fs.writeFileSync(configFileDir, JSON.stringify(config));

        console.info(`Config file successfully created in "${configFileDir}"`);
    });
}