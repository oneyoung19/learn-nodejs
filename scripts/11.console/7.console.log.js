/*
console.log([data][,...args])

其中data参数可使用[形式符](https://nodejs.org/docs/latest/api/util.html#utilformatformat-args)
- %s：字符串将用于转换除 BigInt、Object 和 -0 之外的所有值。BigInt 值将用一个 n 表示，没有用户定义 toString 函数的对象将使用 util.inspect() 进行检查，选项为 { depth: 0, colors: false, compact: 3 }。
- %d：数字将用于转换除 BigInt 和 Symbol 之外的所有值。
- %i：parseInt(value, 10) 用于转换除 BigInt 和 Symbol 之外的所有值。
- %f：parseFloat(value) 用于转换除 Symbol 之外的所有值。
- %j：JSON。如果参数包含循环引用，则替换为字符串 [Circular]。
- %o：对象。对象的字符串表示，使用通用 JavaScript 对象格式。类似于 util.inspect()，选项为 { showHidden: true, showProxy: true }。这将显示完整对象，包括不可枚举的属性和代理。
- %O：对象。对象的字符串表示，使用通用 JavaScript 对象格式。类似于没有选项的 util.inspect()。这将显示完整对象，但不包括不可枚举的属性和代理。
- %c：CSS。此说明符被忽略，将跳过任何传入的 CSS。

%%：单个百分号 (%)。这不会消耗任何参数

其他形式：
console.debug()
console.info()
*/

const count = 5
console.log('count: %d', count)
// Prints: count: 5, to stdout

console.log('count:', count)
// Prints: count: 5, to stdout