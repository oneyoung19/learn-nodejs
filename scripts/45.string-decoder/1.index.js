/*
string_decoder 是 Node.js 中的一个模块，用于将缓冲区（buffer）数据解码为字符串。

它特别有用在处理从流（stream）中接收的部分数据时，确保不会因为字符的切断而导致乱码。

在 Node.js 中，Buffer 是处理二进制数据的主要方式。

但是，当你需要将这些二进制数据转换为字符串时，可能会遇到部分字符被截断的情况，特别是在处理多字节字符时。

string_decoder 模块可以解决这个问题，确保数据在转换过程中保持完整性。

- new StringDecoder([encoding])：创建一个新的 StringDecoder 实例。encoding 是可选参数，指定要使用的字符编码（默认是 'utf8'）。
- decoder.write(buffer)：解码缓冲区数据并返回解码后的字符串。
- decoder.end([buffer])：与 write 方法类似，但是它表示流的结束，返回解码剩余的任何字符。
*/
const { StringDecoder } = require('node:string_decoder')

const decoder = new StringDecoder('utf8')

const buffer1 = Buffer.from('E6', 'hex') // 部分的 UTF-8 编码字符
const buffer2 = Buffer.from('9C', 'hex')
const buffer3 = Buffer.from('AC', 'hex')

console.log(decoder.write(buffer1)) // 输出 ''
console.log(decoder.write(buffer2)) // 输出 ''
console.log(decoder.write(buffer3)) // 输出 '本'
