import io from 'socket.io-client'
const socket = io(process.env.URL+"/rooms")

export default socket