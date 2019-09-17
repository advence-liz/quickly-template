const parseFileName = require('./parseFileName')

function handlerRename(rename, name) {
    return (file, cb) => {
        const {
            fileName = name,
            rename: renameCurrentFile = rename
        } = parseFileName(file.stem)

        file.stem = fileName
        if (renameCurrentFile) file.stem = name
        cb(null, file)
    }
}

module.exports = handlerRename
