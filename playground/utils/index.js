const fs = require('fs')
const path = require('path')

function getAllFilePaths(dir) {
  let filePaths = []

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const subDirFiles = getAllFilePaths(fullPath)
      filePaths = filePaths.concat(subDirFiles)
    } else if (entry.isFile()) {
      filePaths.push(fullPath)
    }
  }

  return filePaths
}

module.exports = {
  getAllFilePaths
}
