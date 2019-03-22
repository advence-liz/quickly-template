const debug = require('debug')('qt:cli')
const findup = require('findup-sync')
const path = require('path')
let context = process.cwd()
let config = {}
try {
    const configFilePath = findup('./qt.config.js')
    context = path.dirname(configFilePath)
    debug(configFilePath)
    config = require(path.resolve(configFilePath))
} catch (error) {
    debug(error)
}

module.exports = {
    ...{ root: 'templates', rename: false },
    context,
    ...config
}
