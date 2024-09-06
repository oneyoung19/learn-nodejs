const app = {
  middlewares: [],
  use (fn) {
    this.middlewares.push(fn)
  },
  compose (middlewares) {
    let index = 0
    // 返回函数
    return function (ctx) {
      // dispatch是一个返回promise的函数
      function dispatch (index) {
        // middleware是一个返回promise的函数
        const middleware = middlewares[index]
        // next也是一个返回promise的函数
        const next = index < middlewares.length - 1 ? () => dispatch(++index) : () => Promise.resolve()
        return middleware(ctx, next)
      }
      // 返回promise
      return dispatch(index)
    }
  },
  listen (port) {
    const promiseFn = this.compose(this.middlewares)
    const ctx = {
      query: {
        name: 'test'
      },
      body: 'Hello'
    }
    promiseFn(ctx).then(_ => {
      console.log(`app listening on port ${port}`)
    }).catch(err => {
      console.error('err', err)
    })
  }
}

app.use(async (ctx, next) => {
  console.log('middleware 1')
  await next()
  console.log('middleware 1 after')
})

app.use(async (ctx, next) => {
  console.log('middleware 2')
  await Promise.reject('Reject err')
  await next()
  console.log('middleware 2 after')
})

app.use(async (ctx, next) => {
  console.log('middleware 3')
  await next()
  console.log('middleware 3 after')
})

app.listen(3000)
