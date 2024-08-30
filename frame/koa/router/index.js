const Router = require('koa-router')
const router = new Router()

router.get('/list', (ctx) => {
  ctx.body = 'Home List'
  // res.render('home', { msg: 'Home List' })
})

module.exports = router
