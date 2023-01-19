import http from 'http'
import socketIO from 'socket.io'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    //console.log("socketio xd")
    io.of("/rooms").on('connection', (socket) => {
      // console.log("Connected")

      socket.on('joinRoom', (args) => {
        //console.log("Join route event")
        //console.log(args)
        let room = "room-"+args.roomId
        // console.log(room)
        socket.join(room)
      })

      socket.on("loadFile", (args) => {

        let room = "room-"+args.roomId
        io.of("/rooms").to(room).emit('openPage', args)
      })

      socket.on("refresh", (args) => {

        let room = "room-"+args.roomId

        io.of("/rooms").to(room).emit('refreshPage')
      })
    })
  })
}