const Router = require('koa-router')
const router = new Router()
const fs = require('node:fs')
const path = require('node:path')

const multer = require('@koa/multer')
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

router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log(ctx)
  console.log('ctx.request.file', ctx.request.file)
  console.log('ctx.file', ctx.file)
  try {
    ctx.body = 'File uploaded successfully!'
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/download', async (ctx) => {
  const { filename } = ctx.request.body
  const filePath = path.join(__dirname, '../uploads', filename)
  
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('File failed to download:', err)
      ctx.status = 500
      ctx.body = 'Error downloading file'
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
