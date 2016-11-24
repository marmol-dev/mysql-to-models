interface IProjectConfig {
    minVersion: string;
    database: {
        host: string;
        user: string;
        password: string;
        database: string;
    }
    
}

export = IProjectConfig;