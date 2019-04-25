#!/usr/bin/env node
const fs = require('fs')
const yargs = require('yargs')
const { red, blue, green } = require('chalk')
const debug = require('debug')('qt:cli')
const { createTemplate } = require('./lib/createTemplate')
const { findTemplate } = require('./lib/template')
const config = require('./config.js')
const argv = yargs
    .config(config)
    .config('config', '配置文件所在位置', function(configPath) {
        return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    })
    .option('root', {
        type: 'string',
        description: '模板所在根目录,相对目录,基于context来获取root的绝对路径，'
    })
    .option('context', {
        type: 'string',
        description:
            '默认为process.cwd(), 如果文件qt.config.js存在则为配置文件所在根目录(推荐使用配置文件)'
    })
    .option('target', {
        type: 'string',
        default: '',
        description: '新生成模块的输出路径，相对路径，默认为process.cwd()'
    })
    .option('template', {
        type: 'string',
        description:
            '当前使用的模板，模板可选范围即root下面指定的模板，支持简写即当前有模板page那么p,pa,pag等效'
    })
    .option('name', { type: 'string', description: '新生成模块的名称' })
    .option('rename', {
        type: 'boolean',
        default: false,
        alias: 'r',
        description:
            '为了兼容微信小程序的形式新生成的模块目录下面的文件名字是否全部改变为跟新模块一致，目前有默认检测功能所以也无需手动指定'
    })
    .demandOption('root')
    .epilogue(
        'for more information, find our manual at https://github.com/advence-liz/quickly-template'
    )
    .fail(function(msg, err, yargs) {
        if (err) throw err // preserve stack
        console.error(red(`${msg}`))
        console.log(yargs.help())
        process.exit(1)
    })

    .command(
        'new <template> <name> [target]',
        'new <template> <name> [target]',
        {},
        createTemplate
    )
    .command(
        '$0',
        'usage: qt new <template> <name> [target]',
        () => {},
        argv => {
            yargs.showHelp()
            console.log(green('当前检测到的可用模板:'))
            console.log(blue(findTemplate(argv).join('\n')))
        }
    )
    .example('$0 new page test', '以page为模板创建一个test模块')

    .help('help')
    .alias('help', 'h').argv

debug(argv)

process.on('uncaughtException', err => {
    console.info(err)
    process.exit(1)
})
process.on('unhandledRejection', err => {
    console.info(err)
    process.exit(1)
})
