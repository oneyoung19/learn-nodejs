/*
import导入的方式：

1. file URLS
import './test.mjs?query=1' // loads ./test.mjs with query of "?query=1"

2. data imports
text/javascript for ES modules
application/json for JSON
application/wasm for Wasm

3. node imports
import fs from 'node:fs/promises'

*/

import './test.mjs?query=1'

import 'data:text/javascript,console.log("hello!")'
// import _ from 'data:application/json,"world!"' with { type: 'json' }
