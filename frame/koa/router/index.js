const Router = require('koa-router')
const router = new Router()

router.get('/list', async (ctx) => {
  // ctx.body = 'Home List'
  await ctx.render('home', { msg: 'Home List' })
})

module.exports = router
