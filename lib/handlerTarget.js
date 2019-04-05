const path = require('path')
const parseFileName = require('./parseFileName')

function handlerTarget(targetCLI) {
    return (file, cb) => {
        const { target = '' } = parseFileName(file.stem)
        file.basename = path.join(targetCLI, target, file.basename)
        cb(null, file)
    }
}

module.exports = handlerTarget
