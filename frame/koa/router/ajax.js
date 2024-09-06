const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
  await ctx.render('ajax')
  // await next()
})

// get
router.get('/get', async (ctx, next) => {
  // await next()
  ctx.body = ctx.query
})

// urlencoded
router.post('/post/urlencoded', async (ctx, next) => {
  // await next()
  ctx.body = ctx.request.body
})

// formdata
router.post('/post/formdata', async (ctx, next) => {
  // await next()
  ctx.body = ctx.request.body
})

// json
router.post('/post/json', async (ctx, next) => {
  console.log('json', ctx.request.body)
  // await next()
  ctx.body = ctx.request.body
})

// text
router.post('/post/text', async (ctx, next) => {
  // await next()
  ctx.body = ctx.request.body
})

// raw
router.post('/post/raw', async (ctx, next) => {
  // await next()
  ctx.body = ctx.request.body
})

module.exports = router
