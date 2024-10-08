const Controller = require('egg').Controller

class NewsController extends Controller {
  async list() {
    // const dataList = {
    //   list: [
    //     { id: 1, title: 'This is news 1', url: '/news/1' },
    //     { id: 2, title: 'This is news 2', url: '/news/2' }
    //   ]
    // }
    // await this.ctx.render('news/list.ejs', dataList)
    const ctx = this.ctx
    const page = ctx.query.page || 1
    const newsList = await ctx.service.news.list(page)
    await ctx.render('news/list.ejs', { list: newsList })
  }
}

module.exports = NewsController
