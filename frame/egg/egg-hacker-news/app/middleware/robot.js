// app/middleware/robot.js
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || ''
    const match = options.ua.some((ua) => ua.test(source))
    if (match) {
      ctx.status = 403
      ctx.message = 'Go away, robot.'
    } else {
      await next()
    }
  }
}

// 利用中间件判断User-Agent,从而实现拦截百度爬虫。可使用 curl http://localhost:7001/news -A "Baiduspider" 查看效果
