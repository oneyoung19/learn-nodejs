const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  // res.send('Home List')
  res.render('home', { msg: 'Home List' })
})

module.exports = router
