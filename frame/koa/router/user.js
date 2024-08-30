const Router = require('koa-router')
const router = new Router()

router.get('/list', async (ctx) => {
  // ctx.body = 'User List'
  await ctx.render('user', { msg: 'User List' })
})

module.exports = router
