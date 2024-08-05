/*
https://nodejs.org/docs/latest/api/intl.html

在Node.js中，国际化（Internationalization，简称i18n）是指使应用程序能够支持多种语言和文化的功能。

Node.js 提供了一些内置的模块和工具来帮助开发人员实现国际化功能。

[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) 是 ECMAScript 的一个内置对象，提供了语言敏感的字符串比较、数字格式化、日期和时间格式化等功能。Intl 对象在 Node.js 中也可用，主要包括以下几个构造函数：

Intl.Collator：用于比较字符串。
Intl.NumberFormat：用于格式化数字。
Intl.DateTimeFormat：用于格式化日期和时间。

*/
const hasICU = typeof Intl === 'object'

console.log(hasICU)

const number = 123456.789;
console.log(new Intl.NumberFormat('de-DE').format(number)); // 输出: "123.456,789"

const date = new Date();
console.log(new Intl.DateTimeFormat('en-GB').format(date)); // 输出: "05/08/2024" （在英国格式下）

