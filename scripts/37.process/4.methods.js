/*
`process` 对象中常用的可执行方法：

1. **`process.cwd()`**：返回 Node.js 进程的当前工作目录。

2. **`process.chdir(directory)`**：更改 Node.js 进程的当前工作目录。

3. **`process.memoryUsage()`**：返回一个对象，表示 Node.js 进程的内存使用情况。

4. **`process.uptime()`**：返回 Node.js 进程的运行时间（以秒为单位）。

5. **`process.hrtime([time])`**：返回高分辨率的实时时间，作为一个 `[seconds, nanoseconds]` 数组。如果传入 `time` 参数，则返回与该时间的差值。

6. **`process.nextTick(callback)`**：在当前操作完成之后立即执行一个回调函数。

7. **`process.abort()`**：使 Node.js 进程立即以非 0 的退出码终止。

8. **`process.emitWarning(warning[, options])`**：发出一个自定义警告，可以指定警告消息和选项。

9. **`process.kill(pid[, signal])`**：向指定的进程 ID (`pid`) 发送信号，可以用来终止进程。

10. **`process.exit([code])`**：以指定的退出码退出 Node.js 进程。如果不指定 `code`，默认退出码为 0。

11. **`process.on(eventName, listener)`**：为 `process` 对象的事件添加监听器，例如 `exit`、`uncaughtException` 等事件。

12. **`process.removeListener(eventName, listener)`**：移除指定事件的监听器。

13. **`process.setUncaughtExceptionCaptureCallback(callback)`**：设置一个回调函数，以捕获未捕获的异常。

14. **`process.send(message[, sendHandle[, options]][, callback])`**：如果 Node.js 进程是通过 `child_process.fork()` 创建的子进程，可以使用此方法向父进程发送消息。

15. **`process.disconnect()`**：如果 Node.js 进程是通过 `child_process.fork()` 创建的子进程，断开与父进程的 IPC 通道。
*/

/*
Node.js 进程的退出码（Exit Codes）可以帮助判断进程的终止原因。以下是一些常见的退出码及其含义：

1. **`0`** - 正常退出（Success）：进程成功完成，没有发生错误。

2. **`1`** - 一般性错误（Uncaught Fatal Exception）：未捕获的致命异常导致进程退出。

3. **`3`** - 内部 JavaScript 解析错误（Internal JavaScript Parse Error）：JavaScript 源代码无法解析。

4. **`4`** - 内部 JavaScript 评估失败（Internal JavaScript Evaluation Failure）：JavaScript 代码在解析后无法执行。

5. **`5`** - 致命的 V8 错误（Fatal Error）：V8 引擎遇到致命错误（通常与 V8 内部机制有关）。

6. **`6`** - 非函数的异常处理程序（Non-function Internal Exception Handler）：异常处理机制设置错误。

7. **`7`** - 内部异常处理失败（Internal Exception Handler Run-Time Failure）：在处理异常时发生失败。

8. **`9`** - 无效的参数（Invalid Argument）：传递给 Node.js 的参数无效或不合法。

9. **`10`** - 内部 JavaScript 运行时失败（Internal JavaScript Run-Time Failure）：JavaScript 引擎在运行时遇到错误。

10. **`12`** - 无效的调试参数（Invalid Debug Argument）：启动时传递了无效的调试选项。

11. **`128`** + **`信号编号`** - 由于接收到信号而退出：进程因接收到信号而退出，信号编号加上 128 作为退出码。例如，`SIGINT` 信号的编号是 `2`，则进程接收到 `SIGINT` 信号时的退出码为 `130` (`128 + 2`)。

12. **`137`** - 因 `SIGKILL` 信号被杀死（例如使用 `kill -9` 命令）：通常用于强制终止进程。

13. **`139`** - 段错误（Segmentation Fault）：由于访问了无效的内存地址导致的崩溃。

14. **`143`** - 因 `SIGTERM` 信号被终止：一般用于正常终止进程。
*/

console.log('a')

process.exit(1)

console.log('b')
