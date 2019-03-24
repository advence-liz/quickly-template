#!/usr/bin/env node
const fs = require('fs')
const yargs = require('yargs')
const glob = require('glob')
const path = require('path')
const { red } = require('chalk')
const debug = require('debug')('qt:cli')
const createTemplate = require('./lib/createTemplate')
const config = require('./config.js')
const argv = yargs
    .config(config)
    .config('config', function(configPath) {
        return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    })
    .option('root', { type: 'string', description: '模板所在根目录' })
    .option('context', { type: 'string' })
    .option('template', { type: 'string' })
    .option('name', { type: 'string' })
    .option('rename', { type: 'boolean', default: false })
    .demandOption('root')
    .command(
        'new <template> <name>',
        'new <template> <name>',
        {},
        createTemplate
    )
    .epilogue(
        'for more information, find our manual at https://github.com/advence-liz/quickly-template'
    )
    .fail(function(msg, err, yargs) {
        if (err) throw err // preserve stack
        console.error(
            red(`
        You broke it!
        ${msg}
        You should be doing
        `)
        )

        console.log(yargs.help())
        process.exit(1)
    })
    .command(
        '$0',
        'qt new <template> <name>',
        () => {},
        argv => {
            yargs.showHelp()
            console.log('current template:')
            console.log(findTemplate(argv).join('\n'))
        }
    )
    .help('help')
    .alias('help', 'h').argv

debug(argv)

function findTemplate(argv) {
    const { root, context } = argv

    return glob.sync(path.join(context, root, '*')).map(filePath => {
        const templateName = path.parse(filePath).name
        return `qt new  ${templateName} new new${templateName}`
    })
}
