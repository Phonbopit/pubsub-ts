import { describe, expect, it, vi } from 'vitest'
import InMemoryPubSub from '../src/02-basic-pubsub'

describe('InMemoryPubSub', () => {
  it('should subscribe and publish messages', () => {
    const pubSub = new InMemoryPubSub()
    const mockListener = vi.fn()

    pubSub.subscribe('test-topic', mockListener)
    pubSub.publish('test-topic', { message: 'Hello World' })

    expect(mockListener).toHaveBeenCalledWith({ message: 'Hello World' })
    expect(mockListener).toHaveBeenCalledTimes(1)
  })

  it('should unsubscribe from topics', () => {
    const pubSub = new InMemoryPubSub()
    const mockListener = vi.fn()

    const unsubscribe = pubSub.subscribe('test-topic', mockListener)
    pubSub.publish('test-topic', 'first message')

    unsubscribe()
    pubSub.publish('test-topic', 'second message')

    expect(mockListener).toHaveBeenCalledTimes(1)
    expect(mockListener).toHaveBeenCalledWith('first message')
  })

  it('should handle multiple subscribers', () => {
    const pubSub = new InMemoryPubSub()
    const listener1 = vi.fn()
    const listener2 = vi.fn()

    pubSub.subscribe('test-topic', listener1)
    pubSub.subscribe('test-topic', listener2)
    pubSub.publish('test-topic', 'broadcast message')

    expect(listener1).toHaveBeenCalledWith('broadcast message')
    expect(listener2).toHaveBeenCalledWith('broadcast message')
  })

  it('should handle errors in listeners gracefully', () => {
    const pubSub = new InMemoryPubSub()
    const errorListener = vi.fn(() => {
      throw new Error('Listener error')
    })
    const normalListener = vi.fn()

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    pubSub.subscribe('test-topic', errorListener)
    pubSub.subscribe('test-topic', normalListener)
    pubSub.publish('test-topic', 'test message')

    expect(errorListener).toHaveBeenCalled()
    expect(normalListener).toHaveBeenCalledWith('test message')
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
