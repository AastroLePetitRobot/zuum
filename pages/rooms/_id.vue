<template>
	<v-btn @click="sendMessage">Open</v-btn>
</template>
  
<script>
import socket from '~/plugins/socket.io.js'

export default {
	data() {
		return {
			
		}
	},
	mounted() {
		this.roomId = this.$route.params.id
		console.log(this.roomId)

		socket.on('openPage', (args) => {
			console.log(args.file)
			console.log("XD")
			window.open("https://google.com", "_blank")
		})

		socket.emit('joinRoom', {roomId: this.roomId})
	},
	methods: {
		sendMessage() {
			console.log(socket)
			socket.emit("loadFile", {roomId: this.roomId, file:"Test"})
		},
	}
}
</script>
  
 