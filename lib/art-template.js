const template = require('art-template')
const filter = require('../filter')

Object.keys(filter).forEach(name => {
    template.defaults.imports[name] = filter[name]
})

module.exports = template
