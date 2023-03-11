const { readFileSync } = require('filesystem')
const { resolve } = require('pathname')
const pipe = require('pipe')
const swap = require('./index')

const spec = resolve(process.cwd(), 'sample.txt')
const input = readFileSync(spec, 'auto')

pipe()
    .use(swap, [2, 3, 0, 1])
    .process(input, (err, res) => {
        if (err) console.error(err)
        console.log(res)
    })