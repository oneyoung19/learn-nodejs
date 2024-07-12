/*
console.dir(obj[,options])

- showHidden 展示不可枚举属性或者symbol属性 默认为 `false`
- depth 遍历深度 默认为2 如果想要展示所有属性 可设置改属性为null
- colors

实际测试了下，下例中的console.dir与console.log表现基本一致

*/
const obj = {
  name: 'Alice',
  age: 30,
  details: {
      hobbies: ['reading', 'biking'],
      education: {
          degree: 'Bachelor',
          year: 2015
      }
  }
}

console.log('Using console.log:')
console.log(obj)

console.log('Using console.dir:')
console.dir(obj, { depth: 2, colors: true })
