const fse = require('fs-extra')
const path = require('path')
const DIST_DIR = path.resolve(__dirname, '../dist')

fse.emptyDirSync(DIST_DIR)
