console.log('b starting')
export var done = false
import { done as aDone } from './a.mjs'
console.log('in b, a.done = %j', aDone)
done = true
console.log('b done')
