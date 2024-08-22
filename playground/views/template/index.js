const path = require('node:path')
const fs = require('node:fs')

const ejs = require('ejs')

const headerTemplate = fs.readFileSync(path.resolve(__dirname, './header.ejs'), 'utf-8')
const footerTemplate = fs.readFileSync(path.resolve(__dirname, './footer.ejs'), 'utf-8')

const routeInfo = {
  home: {
    tdk: {
      title: 'Home',
      description: 'Home',
      keywords: 'Home'
    },
    message: 'Hello World'
  },
  foo: {
    tdk: {
      title: 'foo',
      description: 'foo',
      keywords: 'foo'
    }
  }
}

const getRouteTemplate = (routeName) => {
  const routePath = path.resolve(__dirname, `./route/${routeName}.ejs`)
  if (!fs.existsSync(routePath)) return false
  const template = fs.readFileSync(routePath, 'utf-8')
  return ejs.render(template, {
    header: ejs.render(headerTemplate, { ...routeInfo[routeName].tdk, message: 'Home Page' }),
    footer: ejs.render(footerTemplate),
    ...routeInfo[routeName]
  })
}

module.exports = {
  getRouteTemplate
}
