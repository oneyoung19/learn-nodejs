/*
提供写入文件的 JSON 格式的诊断摘要。

该报告旨在供开发、测试和生产使用，以捕获和保存用于确定问题的信息。

它包括 JavaScript 和本机堆栈跟踪、堆统计信息、平台信息、资源使用情况等。

启用报告选项后，除了通过 API 调用以编程方式触发之外，还可以针对未处理的异常、致命错误和用户信号触发诊断报告。

node --report-uncaught-exception --report-on-signal \
--report-on-fatalerror ../1.assertion-testing/1-1.strict.js
*/
