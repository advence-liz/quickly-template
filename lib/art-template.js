const template = require('art-template')
const filter = require('../filter')

Object.keys(filter).forEach(name => {
    template.defaults.imports[name] = filter[name]
})

template.defaults.rules.push({
    test: /__([\w\W]*?)_([\w\W]*?)__/,
    use: function(match, code, rule) {
        return {
            code: '$imports.' + rule + '(' + code + ')',
            output: 'escape'
        }
    }
})

module.exports = template
