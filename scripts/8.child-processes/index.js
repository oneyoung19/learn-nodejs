/*
{
  _forkChild: [Function: _forkChild],
  ChildProcess: [Function: ChildProcess],
  exec: [Function: exec],
  execFile: [Function: execFile],
  execFileSync: [Function: execFileSync],
  execSync: [Function: execSync],
  fork: [Function: fork],
  spawn: [Function: spawn],
  spawnSync: [Function: spawnSync]
}
*/
const childProcess = require('node:child_process')

console.log(childProcess)

// process不包含fork方法
const process = require('node:process')
console.log(process.fork)
