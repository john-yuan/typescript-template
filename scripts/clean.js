const fse = require('fs-extra')
const path = require('path')
const ROOT = path.resolve(__dirname, '..')
const DIST_DIR = path.resolve(ROOT, 'dist')

fse.emptyDirSync(DIST_DIR)
