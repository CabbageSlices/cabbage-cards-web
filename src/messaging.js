import ports from './ports'
import EventEmitter from 'event-emitter'

const eventManager = EventEmitter()

const send = (messageType, messageData) => {

	let event = messageType
	let data = {...messageData}

	if(messageType.indexOf(ports.backendMessage) >= 0 && !data.sentFromServer) {
		event = 'sendToBackend'
		data = {...data, messageType: messageType.replace(ports.backendMessage, '')}
	}
	eventManager.emit(event, data)
}

const receive = (messageType, callback) => {eventManager.on(messageType, callback)}

export default eventManager
export { send, receive }