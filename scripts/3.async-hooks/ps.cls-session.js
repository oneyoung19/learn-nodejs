/*

https://github.com/shfshanyue/cls-session

https://github.com/othiym23/node-continuation-local-storage

*/
const Session = require('cls-session')
const session = new Session()
// const session = new Map()
 
function timeout (id) {
  session.scope(() => {
    session.set('a', id)
    setTimeout(() => {
      const a = session.get('a')
      console.log(a)
    })
  })
}
 
timeout(1)
timeout(2)
timeout(3)