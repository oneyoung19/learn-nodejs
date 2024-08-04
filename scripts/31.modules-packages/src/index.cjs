// require不能导入esm模块
// const getMessage = require('./utils-esm.mjs')
// console.log(getMessage)

// CommonJS模块中，可以使用import懒加载加载esm模块
// import('./utils-esm.mjs').then(res => {
//   console.log(res)
// })

// 不能使用import
// import myModule from './utils-esm.mjs'
// console.log(myModule)
