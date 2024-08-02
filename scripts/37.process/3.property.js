/*
Node.js 中 `process` 对象的不分属性：

1. **`process.argv`**：启动 Node.js 进程时传入的命令行参数数组。

2. **`process.env`**：表示当前用户环境的环境变量对象。

3. **`process.exitCode`**：获取或设置进程退出时的退出码。

4. **`process.pid`**：当前进程的进程 ID。

5. **`process.ppid`**：当前进程的父进程 ID。

6. **`process.platform`**：当前运行平台的字符串，例如 `'darwin'`（macOS）、`'win32'`（Windows）、`'linux'` 等。

7. **`process.version`**：当前运行的 Node.js 版本字符串。

8. **`process.versions`**：一个对象，包含 Node.js 及其依赖的版本信息。

9. **`process.arch`**：当前运行的操作系统 CPU 架构，例如 `'x64'`、`'arm'` 等。

10. **`process.release`**：包含 Node.js 相关版本和构建元数据的对象。

11. **`process.title`**：当前进程的名称，可以被修改。

12. **`process.config`**：Node.js 构建配置选项的对象。

13. **`process.execPath`**：启动当前进程的 Node.js 可执行文件的绝对路径。

14. **`process.execArgv`**：启动当前进程时传给 Node.js 的命令行选项的数组。
*/

console.log(process)
