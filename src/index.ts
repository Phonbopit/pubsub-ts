import emitter from './01-simple-emitter'
import InMemoryPubSub from './02-basic-pubsub'
import BasicJobScheduler from './03-basic-job-scheduler'

const runLesson1 = async () => {
  const event = 'log'

  setTimeout(() => {
    emitter.emit(event, {
      text: 'Hello from index.ts file!',
      timestamp: new Date(),
    })
  }, 2000)
}

const runLesson2 = async () => {
  type Greeting = { message: string }

  const pubSub = new InMemoryPubSub()
  const unsubscribe = pubSub.subscribe<Greeting>('greeting', (message) =>
    console.log('Received message:', message),
  )

  pubSub.publish('greeting', { message: 'Ahoy!' })

  unsubscribe()
}

const runLesson3 = async () => {
  const scheduler = new BasicJobScheduler()

  const job1 = scheduler.scheduleOnce(5000, () => {
    console.log('✅ Job 1 completed!')
  })

  const job2 = scheduler.scheduleInterval(1000, () => {
    console.log(`⏰ Tick: ${new Date().toLocaleTimeString()}`)
  })

  console.log(`Active job count: ${scheduler.getActiveJobCount()}`)
  console.log(`Job1: ${job1}`)
  console.log(`Job2: ${job2}`)

  // Stop after 3 seconds
  setTimeout(() => {
    scheduler.cancelAllJobs()
    console.log('🛑 All jobs cancelled')
    process.exit(0)
  }, 10000)
}

runLesson1().catch(console.error)
runLesson2().catch(console.error)
runLesson3().catch(console.error)
