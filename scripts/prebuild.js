const fse = require('fs-extra')
const path = require('path')
const ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.resolve(ROOT, 'src')
const DIST_DIR = path.resolve(ROOT, 'dist')

const visitDir = (filename, visit) => {
  const stat = fse.statSync(filename)

  if (stat.isDirectory()) {
    fse.readdirSync(filename).forEach((child) => {
      const childFilename = path.resolve(filename, child)
      visitDir(childFilename, visit)
    })
  } else if (stat.isFile()) {
    visit(filename)
  }
}

fse.emptyDirSync(DIST_DIR)

visitDir(SRC_DIR, (filename) => {
  if (/\.(less|svg|png|jpg|jpeg)$/.test(filename)) {
    const relativeFilename = path.relative(SRC_DIR, filename)
    const distFilename = path.resolve(DIST_DIR, relativeFilename)
    fse.copySync(filename, distFilename)
  }
})
