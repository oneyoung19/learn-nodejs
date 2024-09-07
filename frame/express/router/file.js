const express = require('express')
const router = express.Router()
const fs = require('node:fs')
const path = require('node:path')

const multer = require('multer')
const uploadDirname = 'uploads'
const uploadDir = path.resolve(__dirname, uploadDirname)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
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

router.post('/download', (req, res) => {
  const { filename } = req.body
  const filePath = path.join(__dirname, '../uploads', filename)
  // express中提供了download和sendFile方法
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('File failed to download:', err)
      res.status(500).send('Error downloading file')
    }
  })
  // res.sendFile(filePath, (err) => {
  //   if (err) {
  //     console.error('File failed to send:', err)
  //     res.status(500).send('Error sending file')
  //   }
  // })
})

module.exports = router
