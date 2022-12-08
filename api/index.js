const express = require('express')
const routes = require('./routes/index.js')
const app = express()
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(routes)

export default {
  path: '/api',
  handler: app
}