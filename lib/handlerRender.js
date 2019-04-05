const template = require('./art-template')

const debug = require('debug')('qt:createTemplate')

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
module.exports = handlerRender
