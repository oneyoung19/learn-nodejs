/*
child_process.execFile(file[, args][, options][, callback])

The same options as child_process.exec() are supported. 
*/
const { execFile } = require('child_process')

execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(`execFile error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  if (stderr) {
    console.error(`stderr: ${stderr}`)
  }
})
