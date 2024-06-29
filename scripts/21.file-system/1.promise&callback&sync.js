/*
File System的使用：
- Promise 
- callback & sync
*/

// const path = require('node:path')
// const fs = require('node:fs/promises');
// (async function(path) {
//   try {
//     await fs.unlink(path)
//     console.log(`successfully deleted ${path}`)
//   } catch (error) {
//     console.error('there was an error:', error.message)
//   }
// })(path.resolve(__dirname, './test.txt'))


// const path = require('node:path')
// const fs = require('node:fs')
// const target = path.resolve(__dirname, './test.txt')
// fs.unlink(target, (err) => {
//   if (err) throw err
//   console.log(`successfully deleted ${target}`)
// })

const path = require('node:path')
const fs = require('node:fs')
const target = path.resolve(__dirname, './test.txt')
try {
  fs.unlinkSync(target)
  console.log(`successfully deleted ${target}`)
} catch (err) {
  throw err
}

