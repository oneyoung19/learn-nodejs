const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

router.get('/', (req, res) => {
  res.render('ajax')
})

router.get('/get', (req, res) => {
  res.send(req.query)
})

router.post('/post/urlencoded', (req, res) => {
  res.send(req.body)
})

router.post('/post/formdata', upload.none(), (req, res) => {
  // upload.single('name')
  console.log('req.file', req.body.name)
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
