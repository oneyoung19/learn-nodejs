/*
new Console(options)
- stdout
- stderr
- ignoreErrors
- colorMode
- inspectOptions
- groupIndentation

The global `console` is a special `Console` whose output is sent to `process.stdout` and `process.stderr`。等同于：

new Console({
  stdout: process.stdout,
  stderr: process.stderr
})
*/

const fs = require('node:fs')
const path = require('node:path')
const console = require('node:console')
const { Console } = console

const output = fs.createWriteStream(path.resolve(__dirname, './logs/stdout.log'))
const errorOutput = fs.createWriteStream(path.resolve(__dirname, './logs/stderr.log'))

// Custom simple logger
const logger = new Console({ stdout: output, stderr: errorOutput })

// use it like console
const count = 5
logger.log('count: %d', count)
// In stdout.log: count 5
