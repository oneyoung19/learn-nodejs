/*
https://nodejs.org/docs/latest/api/globals.html

Node环境下全局变量是 `global`，而在浏览器环境下全局变量是 `window`。

另外，在Node中利用console.log打印的global不会显示隐性属性。因此，如果想要查看Node global下的全局变量，可以利用--inspect-brk在浏览器中查看。

![](https://raw.githubusercontent.com/oneyoung19/vuepress-blog-img/Not-Count-Contribution/img/20240808110207.png)
*/
const result = require('./global')

console.log(result)

console.log(global)

console.log(global.message)
