const glob = require('glob')
const path = require('path')
const debug = require('debug')('qt:template')

function findTemplate(argv) {
    const { root, context } = argv

    return glob.sync(path.join(context, root, '*')).map(filePath => {
        return path.parse(filePath).name
    })
}

function getTemplate(argv) {
    const { template } = argv
    const tempaltes = findTemplate(argv)
    const match = []
    tempaltes.forEach(item => {
        if (item.startsWith(template)) match.push(item)
    })
    debug(match)
    return match
}

module.exports = {
    findTemplate,
    getTemplate
}
