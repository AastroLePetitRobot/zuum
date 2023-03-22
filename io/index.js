/*
AUTHOR : Tom MAILLARD & Marvin BONNET

This file enables the creation of a Socket.io server bound to the Web Application server

*/

import http from 'http'
import socketIO from 'socket.io'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
    this.nuxt.hook('close', () => new Promise(server.close))


    io.of("/rooms").on('connection', (socket) => {

      socket.on('joinRoom', (args) => {

        let room = "room-"+args.roomId
        socket.join(room)
      })

      socket.on("loadFile", (args) => {

        let room = "room-"+args.roomId


        io.of("/rooms").to(room).emit('openPage', args)
      })

      socket.on("deleteFile", (args) => {


        let room = "room-"+args.roomId

        io.of("/rooms").to(room).emit('refreshPage')
      })
    })
  })
}