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

// setTimeout(() => {
//   emitter.emit(event, {
//     text: "Hello from emitter!",
//     timestamp: new Date(),
//   });
// }, 2000);
