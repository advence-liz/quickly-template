const debug = require('debug')('qt:cli')
const findup = require('findup-sync')
const path = require('path')
let context = process.cwd()
let config = {}
try {
    const configFilePath = findup('qt.config.js')
    context = path.dirname(configFilePath)
    debug('context',context)
    config = require(path.resolve(configFilePath))
} catch (error) {
    debug(error)
}

module.exports = {
    ...{ rename: false },
    context,
    ...config
}
