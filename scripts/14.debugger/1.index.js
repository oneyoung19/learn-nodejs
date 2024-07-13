/*
https://nodejs.org/docs/latest/api/debugger.html

`node inspect ./scripts.js`

调试器会自动在第一个可执行行处中断。要改为运行直到第一个断点（由 debugger 语句指定），请将 NODE_INSPECT_RESUME_ON_START 环境变量设置为 1 

`NODE_INSPECT_RESUME_ON_START=1 node inspect myscript.js`

- repl 命令允许远程评估代码。
- next 命令进入下一行
- 按 enter 而不键入命令将重复先前的调试器命令。
- 输入 help 查看其他可用命令。
*/