const path = require('node:path')
const fs = require('node:fs')

const ejs = require('ejs')

const headerTemplate = fs.readFileSync(path.resolve(__dirname, './header.ejs'), 'utf-8')
const footerTemplate = fs.readFileSync(path.resolve(__dirname, './footer.ejs'), 'utf-8')

const getRouteTemplate = (routeName) => {
  const template = fs.readFileSync(path.resolve(__dirname, `./route/${routeName}.ejs`), 'utf-8')
  return ejs.render(template, {
    header: ejs.render(headerTemplate, { message: 'Home Page' }),
    footer: ejs.render(footerTemplate)
  })
}

module.exports = {
  getRouteTemplate
}
