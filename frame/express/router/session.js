const express = require('express')
const router = express.Router()

// 设置 Session
router.get('/set-session', (req, res) => {
  req.session.username = req.query.name || 'JohnDoe'
  res.send('Session has been set')
})

// 获取 Session
router.get('/get-session', (req, res) => {
  const username = req.session.username
  res.send(`Username from session: ${username}`)
})

// 销毁 Session
router.get('/destroy-session', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error destroying session')
    }
    res.send('Session has been destroyed')
  })
})

module.exports = router
