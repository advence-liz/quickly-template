const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
function question(q, cb) {
    return new Promise(function(resolve, reject) {
        rl.question(q, answer => {
            cb(answer.toLowerCase() === 'y')
            rl.close()
        })
    })
}
module.exports = { question }
