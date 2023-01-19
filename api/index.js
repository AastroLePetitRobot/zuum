const express = require('express')
const routes = require('./routes/index.js')
const rooms = require('./routes/rooms.js')
const app = express()


app.use(express.static('public'))

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(rooms)
export default {
  path: '/api',
  handler: app
}