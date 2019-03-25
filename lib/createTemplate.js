const path = require('path')
const map = require('map-stream')
const vfs = require('vinyl-fs')
const glob = require('glob')
const fs = require('fs')
const template = require('art-template')
const { question } = require('./rl')
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
function createTemplate(argv) {
    const { name, template, context, root } = argv
    const globPattern = path.join(context, root, template, '**', '*.*')
    if (fs.existsSync(name)) {
        question(`${name}已经存在是否覆盖？(Y/N)`,answer=>{
            console.log(answer)
            if(!answer) process.exit(1)
        }) 
    }
    
    return vfs
        .src([globPattern])
        .pipe(map(handlerRename(isRename(globPattern, argv), name)))
        .pipe(map(handlerRender({ name })))
        .pipe(vfs.dest(name))
        .on('end', () => {
            console.log(`create ${name} succeed!`)
        })
}

module.exports = createTemplate
