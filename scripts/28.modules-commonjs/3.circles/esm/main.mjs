/*
b starting
in b, a.done = %j false
b done
a starting
in a, b.done = %j true
a done
main starting
in main, a.done = %j, b.done = %j', true, true
*/

console.log('main starting')
import { done as aDone } from './a.mjs'
import { done as bDone } from './b.mjs'
console.log('in main, a.done = %j, b.done = %j', aDone, bDone)
