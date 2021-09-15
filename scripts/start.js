const path = require('path')
const childProcess = require('child_process')
const PORT = 8003
const ROOT_DIR = path.resolve(__dirname, '..')
const SRC_DIR = path.resolve(ROOT_DIR, 'src')
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public')
const chokidar = require('chokidar')
const debounce = require('lodash/debounce')
const express = require('express')
const server = express()

const build = debounce(() => {
  childProcess.exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(error)
    }

    if (stdout) {
      console.log(stdout)
    }

    if (stderr) {
      console.error(stderr)
    }

    console.log(`Build at ${new Date().toISOString()}`)
    console.log(`http://localhost:${PORT}/`)
    console.log()
  })
}, 500)

process.chdir(ROOT_DIR)

chokidar.watch(SRC_DIR).on('all', () => {
  build()
})

server.use(express.static(PUBLIC_DIR))
server.listen(PORT)
