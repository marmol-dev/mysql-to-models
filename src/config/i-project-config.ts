import IAnnotation = require("../models/interfaces/i-annotation.model");

interface IProjectConfig {
    minVersion?: string;
    database: {
        host: string;
        user: string;
        password: string;
        database: string;
    };
    annotations?: {
        database?: IAnnotation[];
        tables?: {
            [table: string]: IAnnotation[];
        };
        columns?: {
            [table: string]: {
                [column: string]: IAnnotation[];
            }
        },
        foreignKeys?: {
            [table: string]: {
                [column: string]: IAnnotation[];
            }
        }
    };
    
}

export = IProjectConfig;