// https://blog.xav1er.com/p/middleware-of-koa-and-express/
const app = {
  middlewares: [],
  use (fn) {
    this.middlewares.push(fn)
  },
  // compose (middlewares) {
  //   let index = 0
  //   // 返回函数
  //   return function (req, res) {
  //     // dispatch是一个返回promise的函数
  //     function dispatch (index) {
  //       // middleware是一个返回promise的函数
  //       const middleware = middlewares[index]
  //       // next也是一个返回promise的函数
  //       const next = index < middlewares.length - 1 ? () => dispatch(++index) : () => Promise.resolve()
  //       return middleware(req, res, next)
  //     }
  //     // 返回promise
  //     return dispatch(index)
  //   }
  // },
  compose (middlewares, req, res) {
    let index = -1
    function next () {
      ++index
      if (index > middlewares.length - 1) return
      const middleware = middlewares[index]
      middleware(req, res, next)
    }
    next()
  },
  listen (port) {
    // http.createServer(req, res)
    const req = {}
    const res = {}
    this.compose(this.middlewares, req, res)
    console.log(`app listening on port ${port}`)
  }
}

app.use(async (req, res, next) => {
  console.log('middleware 1')
  await next()
  console.log('middleware 1 after')
})

app.use(async (req, res, next) => {
  console.log('middleware 2')
  // await Promise.reject('Reject err')
  await next()
  console.log('middleware 2 after')
})

app.use(async (req, res, next) => {
  console.log('async')
  await next()
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('async end in 3s')
      resolve()
    }, 3000)
  })
})

app.use(async (req, res, next) => {
  console.log('middleware 3')
  await next()
  console.log('middleware 3 after')
})

app.listen(3000)
