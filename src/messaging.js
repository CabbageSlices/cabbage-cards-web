import ports from './ports'
import EventEmitter from 'event-emitter'

const eventManager = EventEmitter()

const send = (messageType, messageData) => {

	let event = messageType
	let data = {...messageData}

	if(messageType.indexOf(ports.backendMessage) >= 0) {
		event = 'sendToBackend'
		data = {...data, messageType}
	}

	eventManager.emit(event, data)
}

const receive = (messageType, callback) => {eventManager.on(messageType, callback)}

export default eventManager
export { send, receive }