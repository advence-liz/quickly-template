const readline = require('readline')

function question(text) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise(function(resolve, reject) {
        rl.question(text, answer => {
            resolve([answer, rl])
        })
    })
}
async function ask(q) {
    const [answer, rl] = await question(q)
    rl.close()

    return answer
}

module.exports = { ask, question }
