const path = require('path')
const map = require('map-stream')
const vfs = require('vinyl-fs')
const glob = require('glob')
const fs = require('fs')
const { blue, green } = require('chalk')
const template = require('./art-template')
const { ask } = require('./rl')
const { getTemplate } = require('./template')

const debug = require('debug')('qt:createTemplate')

function handlerRename(rename, name) {
    return (file, cb) => {
        
        if (rename) file.stem = name
        cb(null, file)
    }
}
// 调用 art-template 对模板进行编译
function handlerRender(data, options) {
    return (file, cb) => {
        try {
            file.contents = Buffer.from(
                template.render(String(file.contents), data, options)
            )
        } catch (error) {
            debug(error)
        }

        cb(null, file)
    }
}
/**
 *
 * @param {string} globPattern
 * @param {object} argv
 */
function isRename(globPattern, argv) {
    const { rename } = argv
    if (rename) return true
    const fileNames = glob.sync(globPattern).map(filePath => {
        return path.basename(filePath, path.extname(filePath))
    })
    return new Set(fileNames).size === 1
}

async function createTemplate(argv) {
    const { name, context, root, target = '', filter } = argv
    const [template] = getTemplate(argv)

    const globPattern = path.join(context, root, template, '**', '*.*')
    if (fs.existsSync(path.join(target, name))) {
        const answer = await ask(blue(`${name}已经存在是否覆盖？(Y/N)`))

        if (answer.toLowerCase() === 'n') return
    }
    let renderOptions = { name }
    try {
        renderOptions = { name, ...filter[template] }
    } catch (error) {} // eslint-disable-line
    return vfs
        .src([globPattern])
        .pipe(map(handlerRename(isRename(globPattern, argv), name)))
        .pipe(map(handlerRender(renderOptions)))
        .pipe(vfs.dest(path.join(target, name)))
        .on('end', () => {
            console.log(green(`create ${name} succeed!`))
        })
}

module.exports = createTemplate
