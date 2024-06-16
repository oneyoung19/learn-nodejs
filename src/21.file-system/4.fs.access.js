/*
fs.assessSync(path[,mode])
*/
const path = require('node:path')
const fs = require('node:fs')

// 检测文件是否有执行权限
const access = fs.accessSync(path.resolve(__dirname, './3.constants.js'), fs.constants.X_OK)

console.log(access)

/*
fs.access方法用来判断文件是否可访问
F_OK 0 文件是否存在（默认值）
R_OK 1 文件是否可读
W_OK 2 文件是否可写
X_OK 4 文件是否可执行
*/
