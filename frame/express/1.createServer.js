const express = require('express')
const app = express()
const port = 3000

// 静态资源托管
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send('Got a GET request')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app running on http://127.0.0.1:${port}`)
})
