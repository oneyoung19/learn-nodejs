import { getMessage } from "./utils-commonjs.js"
import { getMessage as getMessageESM } from "./utils-esm.mjs"

console.log(getMessage)
console.log(getMessageESM())
