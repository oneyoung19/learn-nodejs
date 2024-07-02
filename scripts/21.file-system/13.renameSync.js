/*
fs.renameSync(oldPath, newPath)

Renames the file from `oldPath` to `newPath`.Returns `undefined`.
*/

const path = require('node:path')
const fs = require('node:fs')

fs.renameSync(path.resolve(__dirname, './12.readFileSync.js'), path.resolve(__dirname, './11.readFileSync.js'))
