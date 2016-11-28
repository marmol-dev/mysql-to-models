import * as yargs from 'yargs';
import * as generate from './generate';
import * as init from './init';

const argv = yargs.usage('mysql-to-models <command> [args]')
    .command('init', 'Init the config file', () => {
        init.run();
    })
    .command('generate [config] [output]', 'Generates the models', <any>((arv : any) => {
        return yargs.options({
            config: {
                alias: 'c',
                default: 'config.json'
            },
            output: {
                alias: 'o',
                default: 'models.json'
            }
        });
    }), <any>((argv: {config: string, output: string}) => {
        generate.run(argv);
    }))
    .help()
    .argv;