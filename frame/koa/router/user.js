const Router = require('koa-router')
const router = new Router()

router.get('/list', (ctx) => {
  ctx.body = 'User List'
  // res.render('user', { msg: 'User List' })
})

module.exports = router
