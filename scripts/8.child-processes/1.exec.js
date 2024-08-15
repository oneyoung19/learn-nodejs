/*
child_process.exec(command[, options][, callback])
*/
const childProcess = require('node:child_process')

childProcess.exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})
