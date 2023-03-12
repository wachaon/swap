# *swap*
*wes* の *pipe* モジュールで使用する変換器になります。
*swap* はテキストや配列の順番を一定周期で入れ替えます
モジュールとして *pipe* で使用する以外に、コンソールからも直接使用できます。

## インストール
*wes* が既にインストールされている必要があります。
コンソールで以下のコマンドでインストールできます。

```bash
wes install @wachaon/swap --bare
```

## 使い方

sample.txt
```
A
B
C
D
E
F
G
H
I
J
K
L
```

コンソールからは *swap* に続けて入れ替える番号を0から入力します。
`--input` は入力するファイルのパスを `--outputo` には出力するファイルパスを入力します。

`--output` が無ければ自動でファイル名を生成します。`--output=""` ならコンソールに結果を出力します。 

```bash
wes swap 2 3 0 1 --input="sample.txt" --output=""
```

モジュールとして使う場合は *pipe* の変換器として使用します。

```javascript
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
```