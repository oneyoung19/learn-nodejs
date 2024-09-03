const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('ajax')
})

router.get('/get', (req, res) => {
  res.send(req.query)
})

router.post('/post/urlencoded', (req, res) => {
  res.send(req.body)
})

router.post('/post/formdata', (req, res) => {
  res.send(req.body)
})

router.post('/post/json', (req, res) => {
  res.send(req.body)
})

router.post('/post/text', (req, res) => {
  res.send(req.body)
})

router.post('/post/raw', (req, res) => {
  res.send(req.body)
})

module.exports = router
