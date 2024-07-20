/*
Transform
*/

const path = require('node:path')
const fs = require('node:fs')
const zlib = require('node:zlib')

const gzip = zlib.createGzip()
const filePath = path.resolve(__dirname, './sample.txt')
const outFilePath = path.resolve(__dirname, './outSample.txt.gz')

fs.createReadStream(filePath).pipe(gzip).pipe(fs.createWriteStream(outFilePath))
