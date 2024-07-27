/*
WASI（WebAssembly System Interface）是一个为WebAssembly（Wasm）设计的系统接口，旨在提供类似于操作系统的功能，使WebAssembly可以运行在各种环境中，包括浏览器、服务器、嵌入式设备等。

WASI允许WebAssembly代码安全、可移植地执行系统操作，例如文件系统访问、网络通信和随机数生成。
*/

// const fs = require('fs')
// const path = require('path')
// const { WASI } = require('wasi')
// const { exec } = require('child_process')

// const wasi = new WASI({
//   args: process.argv,
//   env: process.env,
//   preopens: {
//     '/sandbox': './'
//   }
// })

// const importObject = { wasi_snapshot_preview1: wasi.wasiImport }

// WebAssembly.instantiate(fs.readFileSync('./hello.wasm'), importObject).then(({ instance }) => {
//   wasi.start(instance)
// })
