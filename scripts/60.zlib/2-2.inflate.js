const path = require('path')
const fs = require('fs')
const zlib = require('zlib')

const unzipInput = fs.createReadStream(path.resolve(__dirname, './temp/input.txt.gz'))
const unzipOutput = fs.createWriteStream(path.resolve(__dirname, './temp/uncompressed.txt'))

unzipInput.pipe(zlib.createInflate()).pipe(unzipOutput)
