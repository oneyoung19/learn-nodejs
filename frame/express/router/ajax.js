const express = require('express')
const router = express.Router()

router.get('/get', (req, res) => {
  const { name } = req.query
  res.send(name)
})

router.post('/post/urlencoded', (req, res) => {
  const { name } = req.body
  res.send(name)
})

router.post('/post/formdata', (req, res) => {
  const { name } = req.body
  res.send(name)
})

router.post('/post/json', (req, res) => {
  const { name } = req.body
  res.send(name)
})

module.exports = router
