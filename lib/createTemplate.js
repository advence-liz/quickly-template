const path = require('path')
const map = require('map-stream')
const vfs = require('vinyl-fs')
const fs = require('fs')
const { blue, green } = require('chalk')
const handlerRender = require('./handlerRender')
const { ask } = require('./rl')
const handlerRename = require('./handlerRename')
const handlerTarget = require('./handlerTarget')
const { getTemplate } = require('./template')

const debug = require('debug')('qt:createTemplate')

/**
 *
 * @param {string} globPattern
 * @param {object} argv
 */
function isRename(globPattern, argv) {
    const { rename = false } = argv
    return rename
}

async function createTemplate(argv) {
    const { name, context, root, target = '', filter, isDebug } = argv
    const [template] = getTemplate(argv)

    const globPattern = path.join(context, root, template, '**', '*.*')
    // isDebug参数是因为debug的时候俺不知道怎么answer
    if (!isDebug && fs.existsSync(path.join(target, name))) {
        const answer = await ask(blue(`${name}已经存在是否覆盖？(Y/N)`))

        if (answer.toLowerCase() === 'n') return
    }
    const nameArray = name ? name.split('/') : ['']
    const nameArrayLength = nameArray.length
    let renderOptions = { name, dirname: nameArray[nameArrayLength - 1] }
    try {
        renderOptions = { ...renderOptions, ...filter[template] }
    } catch (error) {} // eslint-disable-line
    // debug('createNewModule',{ globPattern, target, renderOptions, name ,argv})
    createNewModule({ globPattern, target, renderOptions, name }, argv)
    console.log(green(`create ${name} succeed!`))
}
/**
 *
 * @prop {glob} globPattern 路径包含context和root的glob
 * @prop {string} target  输出路径基于cwd
 * @prop {object} renderOptions 最终传入到art-template模板中的参数默认拥有name
 * @prop {string} name 新生成模板的name
 */
function createNewModule(
    { globPattern, target, renderOptions, name },
    argv = {}
) {
    return vfs
        .src([globPattern])
        .pipe(map(handlerTarget(target)))
        .pipe(map(handlerRename(isRename(globPattern, argv), name)))
        .pipe(map(handlerRender(renderOptions)))
        .pipe(vfs.dest(path.join(target, name)))
        // .on('end', () => {
        //     console.log(green(`create ${name} succeed!`))
        // })
}

module.exports = { createTemplate, createNewModule }
