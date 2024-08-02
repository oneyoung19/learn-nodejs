/*
Operate System

Node.js 的 os 模块提供了一些与操作系统相关的实用函数，可以用来获取系统信息和与系统交互。

1. 系统信息:
  - os.arch(): 返回操作系统的CPU架构，例如 x64、arm 等。
  - os.platform(): 返回Node.js编译时的操作系统平台，例如 'darwin'、'win32'、'linux' 等。
  - os.type(): 返回操作系统名称，例如 'Linux'、'Windows_NT'、'Darwin'。
  - os.release(): 返回操作系统的版本号。
  - os.uptime(): 返回系统的运行时间，以秒为单位。

2. 内存信息:
  - os.totalmem(): 返回系统总内存，以字节为单位。
  - os.freemem(): 返回系统空闲内存，以字节为单位。
  - os.loadavg(): 返回一个数组，表示系统的1分钟、5分钟和15分钟的平均负载（只适用于类Unix系统）。

3. 用户信息:
  - os.userInfo(): 返回当前用户的信息对象，包含用户名、主目录路径、Shell等信息。
  - os.homedir(): 返回当前用户的主目录路径。
  - os.hostname(): 返回操作系统的主机名。

4. 网络接口:
  - os.networkInterfaces(): 返回一个包含每个网络接口的详细信息的对象。可以用来获取网络IP地址、MAC地址等。

5. CPU信息:
  - os.cpus(): 返回一个包含每个逻辑CPU内核信息的数组，信息包括型号、速度（MHz）和时间使用情况。
  - os.endianness(): 返回系统的字节序，可能的值为 'BE'（大端）或 'LE'（小端）。

6. 文件路径信息:
  - os.tmpdir(): 返回操作系统默认的临时文件目录。

7. 系统优先级:
  - os.setPriority() 和 os.getPriority(): 设置和获取指定进程的优先级。

*/

const os = require('os')

console.log('操作系统平台:', os.platform())
console.log('系统总内存:', os.totalmem())
console.log('空闲内存:', os.freemem())
console.log('CPU信息:', os.cpus())
console.log('网络接口:', os.networkInterfaces())

