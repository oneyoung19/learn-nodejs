const express = require('express')
const router = express.Router()

const fs = require('node:fs')
const multer = require('multer')
const uploadDirname = 'uploads'
if (!fs.existsSync(uploadDirname)) {
  fs.mkdirSync(uploadDirname, { recursive: true })
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirname)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    console.log(req.file)
    res.send('File uploaded successfully!')
  } catch (error) {
    next(error)
  }
})

module.exports = router
