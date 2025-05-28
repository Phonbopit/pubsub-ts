import { EventEmitter } from 'node:events'

interface MessagePayload {
  text: string
  timestamp: Date
}

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter()

const event = 'log'

emitter.on(event, (payload: MessagePayload) => {
  console.log(`Recieved message: ${JSON.stringify(payload, null, 2)}`)
})

export default emitter
