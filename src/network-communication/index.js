import io from 'socket.io-client/dist/socket.io'
import ports from '../ports.js'
import { send, receive } from '../messaging'

var networkManager = {

	socket: io(ports.backend, { autoConnect: false })
}

networkManager.connectToServer = function({playerName, roomCode}) {

	delete this.socket
	this.socket = io(ports.backend, { autoConnect: false, forceNew: true})
	this.socket.on('connect', () => this.sendConnectionParameters(playerName, roomCode) )
	this.socket.on('message', this.onServerMessage)
	this.socket.on('connect_error', () => send('connectToServer/error'))
	this.socket.on('connect_timeout', () => send('connectToServer/timeout'))
	this.socket.on('invalidRoomCode', () => console.log('invalidCode'))
	this.socket.on('disconnect', (e) => {console.log(e); this.socket.close()}  )
	this.socket.open()
}

networkManager.onServerMessage = function(data) {
	let {messageType, ...messageData} = data
	messageData.sentFromServer = true

	messageType = messageType.indexOf('connectToServer') >= 0 ?
		messageType : `${ports.backendMessage}${messageType}`
	send(messageType, messageData)
}

networkManager.sendConnectionParameters = function(playerName, roomCode) {
	this.socket.emit('webClient', { playerName, roomCode })
}

networkManager.sendMessage = function(data) {
	const {messageType, ...messageData} = data
	this.socket.emit(messageType, messageData)
}

receive('connectToServer', networkManager.connectToServer.bind(networkManager))
receive('sendToBackend', networkManager.sendMessage.bind(networkManager))

export default networkManager