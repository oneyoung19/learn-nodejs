/*
Writable

*/

// const stream = require('node:stream')

// const { Writable } = stream

// console.log(Writable)

const path = require('node:path')
const fs = require('node:fs')
const filePath = path.resolve(__dirname, './sample.txt')

const stream = fs.createWriteStream(filePath)
stream.write('Hello World')
stream.end()
