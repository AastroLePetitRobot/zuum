<template>
	<v-container>

		Room {{ this.roomId }}

		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					Open Dialog
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="text-h5">Add file</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col>
								<v-text-field label="File display name" required></v-text-field>
							</v-col>

							<v-col>
								<v-text-field label="File URL" required></v-text-field>
							</v-col>

							<v-col>
								<v-file-input label="File	"></v-file-input>
							</v-col>

						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						Close
					</v-btn>
					<v-btn color="blue darken-1" text @click="dialog = false">
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-list>
			<v-list-item v-for="item in this.items" :key="item.displayName">
				<v-list-item-content>
					<v-list-item-title v-text="item.displayName"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-icon>
					<v-btn icon @click="openFile(item.url)">
						<v-icon>
							mdi-file-outline
						</v-icon>
					</v-btn>
				</v-list-item-icon>
				<v-list-item-icon>
					<v-btn icon @click="deleteFile(item)">
						<v-icon>
							mdi-delete
						</v-icon>
					</v-btn>
				</v-list-item-icon>
			</v-list-item>
		</v-list>
	</v-container>
</template>
 
<script>
import socket from '~/plugins/socket.io.js'

export default {
	data() {
		return {
			items: [],
			dialog: false,
			file: []
		}
	},

	created() {
		this.roomId = this.$route.params.id
		console.log(this.roomId)
		this.getDataFromApi();
	},

	mounted() {


		socket.on('openPage', (args) => {
			console.log(args.file)
			window.open(args.file, "_blank")
		})

		socket.on('refreshPage', () => {
			console.log("Refresh triggered by socket")
			this.getDataFromApi();
		})

		socket.emit('joinRoom', { roomId: this.roomId })
	},
	methods: {
		getDataFromApi() {
			try {

				this.$axios.get('/rooms', {
					params: {
						roomId: this.roomId
					}
				})
					.then(response => {
						console.log(response)
						this.items = response.data[0].items
						console.log(this.items)
					})
			} catch (error) {
				//console.log(error);
			}
		},

		addFile() {
			let formData = new FormData();
			formData.append("displayName", this.displayName);
			formData.append("file", files[0]);
			formData.append()

		},

		openFile(url) {
			console.log(socket)
			socket.emit("loadFile", { roomId: this.roomId, file: url })
		},

		deleteFile(item) {
			const index = this.items.indexOf(item)
			if (index > -1) {
				this.items.splice(index, 1)
			}
			try {
				this.$axios.post('/rooms/items/delete', {
					roomId: this.roomId,
					newList: this.items
				})
					.then(response => {
						socket.emit("deleteFile", { roomId: this.roomId })
					})
			} catch (error) {
				//console.log(error);
			}
		}
	}
}
</script>
 
