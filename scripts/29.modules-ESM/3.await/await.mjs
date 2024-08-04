/*
Top-level await:

在ES模块中，await可以在顶层使用。

*/

// works
export const five = await Promise.resolve(5)

/*
If a top level await expression never resolves, the node process will exit with a 13 status code.

[status code](https://nodejs.org/docs/latest/api/process.html#exit-codes)

*/
import { spawn } from 'node:child_process'
import { execPath } from 'node:process'
spawn(execPath, [
  '--input-type=module',
  '--eval',
  // Never-resolving Promise:
  'await new Promise(() => {})',
]).once('exit', (code) => {
  console.log(code) // Logs `13`
})
