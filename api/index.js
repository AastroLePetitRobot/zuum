const express = require('express')
const register = require('./routes/register.js')
const rooms = require('./routes/rooms.js')
var cookieParser = require('cookie-parser');

const app = express()


app.use(express.static('public'))

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(register)
app.use(cookieParser());
app.use(rooms)
export default {
  path: '/api',
  handler: app
}