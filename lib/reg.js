// addd[d=ee][ddd=eee]

const reg = /(\[[^[\]]+\]+)/g

function parseFileName(pattern = '') {
    let fileName = pattern.split(reg)[0]
    let opts = parseOptions(pattern.match(reg))
    return { ...opts, fileName }
}

function parseOptions(opts = []) {
    const config = {}
    opts.forEach(opt => {
        let [key, val = true] =  opt.replace(/[\][]/g, '').split('=')
        config[key] = val
    })
    return config
}

let x = parseFileName('addd[d=ee][ddd=eee]')
console.log(x)
