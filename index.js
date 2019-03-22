#!/usr/bin/env node
const fs = require('fs')
const yargs = require('yargs')
const debug = require('debug')('qt:cli')
const createTemplate = require('./lib/createTemplate')
const config = require('./config.js')
const argv = yargs
    .config(config)
    .config('config', function(configPath) {
        return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    })
    .option('root', { type: 'string' })
    .option('template', { type: 'string' })
    .option('name', { type: 'string' })
    .option('rename', { type: 'boolean', default: false })
    .command(
        'new <template> <name>',
        'new <template> <name>',
        {},
        createTemplate
    )
    // .epilogue('for more information, find our manual at http://example.com')
    .fail(function(msg, err, yargs) {
        if (err) throw err // preserve stack
        console.error('You broke it!')
        console.error(msg)
        console.error('You should be doing', yargs.help())
        process.exit(1)
    })
    .command(
        '$0',
        'new <template> <name>',
        () => {},
        argv => {
            yargs.showHelp()
        }
    )
    .help('help')
    .alias('help', 'h').argv
debug(argv)
