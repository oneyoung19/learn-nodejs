/*
deprecate
*/
const util = require('node:util')

const fn1 = util.deprecate(() => {
  console.log('fn1')
}, 'deprecate1', 'DEP0001')
const fn2 = util.deprecate(() => {}, 'deprecate2', 'DEP0001')

fn1() // Emits a deprecation warning with code DEP0001
fn2() // Does not emit a deprecation warning because it has the same code
