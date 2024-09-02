// Cookie 安全字符串
exports.keys = 'egg-hacker-news' + '_1725017968314_5441'

exports.view = {
  defaultViewEngine: 'ejs',
  mapping: {
    '.ejs': 'ejs'
  }
}

// 添加 news 的配置项
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
}
