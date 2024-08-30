// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController

/*
https://eggjs.org/zh-cn/basics/controller.html

Egg.js 的控制器（Controller）是处理请求和响应的代码，它负责处理应用程序的业务逻辑。控制器通常被定义在一个名为 controller 的文件夹中，每个控制器对应一个路由。

在 Egg.js 中，控制器是一个类，继承自 egg 的 Controller 类。每个控制器类中都有 index 方法，这个方法对应于路由中的 GET 请求。

*/


