/*
严格断言与传统断言：
'node:assert/strict'与'node:assert'
在严格断言模式，比较使用 `===` 符号。而传统断言使用的则是 `==` 符号。
*/

const assert = require('node:assert/strict');

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected ... Lines skipped
//
//   [
//     [
// ...
//       2,
// +     3
// -     '3'
//     ],
// ...
//     5
//   ]
