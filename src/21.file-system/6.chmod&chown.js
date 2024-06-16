/*
fs.chmodSync(path, mode)
fs.chownSync(path, uid, gid)
chmod即为 change mode 更改模式
chown即为 change owner 更改所有权
*/

const path = require('node:path')
const fs = require('node:fs')

const result = fs.chmodSync(path.resolve(__dirname, './6.chmod&chown.js'), 0o765)
console.log(result)

/*
0o765是八进制
0 没有许可
1 只执行
2 只写
3 写和执行
4 只读
5 读取和执行
6 读取和写
7 读写和执行
*/