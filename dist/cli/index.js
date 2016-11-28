"use strict";
const yargs = require('yargs');
const generate = require('./generate');
const init = require('./init');
const argv = yargs.usage('mysql-to-models <command> [args]')
    .command('init', 'Init the config file', () => {
    init.run();
})
    .command('generate [config] [output]', 'Generates the models', ((arv) => {
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
}), ((argv) => {
    generate.run(argv);
}))
    .help()
    .argv;
//# sourceMappingURL=index.js.map