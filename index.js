const { isString, isArray } = require('typecheck')
const { STRING, OBJECT, NONE, LF, rLINE_SEP } = require('text')
const { unnamed, get } = require('argv')
const isCLI = require('isCLI')
const { resolve, extname } = require('pathname')
const { readFileSync, writeFileSync } = require('filesystem')
const genGUID = require('genGUID')

if (isCLI(__filename)) {
    const [, ...swapper] = unnamed
    const input = get('input') || console.error('Unspecified params [input]')
    const ext = extname(input)
    const output = get('output') === true ? NONE : resolve(process.cwd(), get('output') || genGUID() + ext)
    const data = ext === NONE ? require(input) : readFileSync(resolve(process.cwd(), input), 'auto')
    const result = swap(data, ...swapper)

    if (output === NONE) console.log(result)
    else console.log(() => writeFileSync(output, result, 'UTF-8'))
} else module.exports = swap

function swap(data, ...swapper) {
    let type = OBJECT
    if (isString(data)) {
        type = STRING
        data = data.split(rLINE_SEP)
    }
    if (isArray(data)) {
        const divisor = Math.max(...swapper) + 1
        const res = []
        for (let i = 0; i < data.length; i++) {
            const mod = i % divisor
            res[i] = data[i - mod + swapper[mod]]
        }
        return type === STRING ? res.join(LF) : res
    } else data
}
