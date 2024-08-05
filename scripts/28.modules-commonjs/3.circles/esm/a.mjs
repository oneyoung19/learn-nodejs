console.log('a starting')
export var done = false
import { done as bDone } from './b.mjs'
console.log('in a, b.done = %j', bDone)
done = true
console.log('a done')
