const path = require('path')
const map = require('map-stream')
const vfs = require('vinyl-fs')
const glob = require('glob')
const template = require('art-template')

function handlerRename(rename, name) {
    return (file, cb) => {
        if (rename) file.stem = name
        cb(null, file)
    }
}
function handlerRender(data, options) {
    return (file, cb) => {
        try {
            file.contents = Buffer.from(
                template.render(String(file.contents), data, options)
            )
        } catch (error) {
            console.error(error)
        }

        cb(null, file)
    }
}

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

    return vfs
        .src([globPattern])
        .pipe(map(handlerRename(isRename(globPattern, argv), name)))
        .pipe(map(handlerRender({ name })))
        .pipe(vfs.dest(name))
}

module.exports = createTemplate
