const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  // res.send('User List')
  res.render('user', { msg: 'User List' })
})

module.exports = router
