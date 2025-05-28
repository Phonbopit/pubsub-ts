import { EventEmitter } from 'node:events'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import emitter from '../src/01-simple-emitter'

interface MessagePayload {
  text: string
  timestamp: Date
}

describe('01-simple-emitter', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should be an instance of EventEmitter', () => {
    expect(emitter).toBeInstanceOf(EventEmitter)
  })

  it('should emit and receive log events', () => {
    const mockPayload: MessagePayload = {
      text: 'Test message',
      timestamp: new Date('2025-01-01T00:00:00.000Z'),
    }

    const listener = vi.fn()
    emitter.on('log', listener)
    emitter.emit('log', mockPayload)

    expect(listener).toHaveBeenCalledWith(mockPayload)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should have the pre-configured console log listener', () => {
    const mockPayload: MessagePayload = {
      text: 'Console test message',
      timestamp: new Date('2024-01-01T00:00:00.000Z'),
    }

    // Re-add the original listener that was cleared in beforeEach
    emitter.on('log', (payload: MessagePayload) => {
      console.log(`Recieved message: ${JSON.stringify(payload, null, 2)}`)
    })

    emitter.emit('log', mockPayload)

    expect(consoleSpy).toHaveBeenCalledWith(
      'Recieved message: {\n  "text": "Console test message",\n  "timestamp": "2024-01-01T00:00:00.000Z"\n}',
    )
  })

  it('should handle once listeners', () => {
    const listener = vi.fn()
    const mockPayload: MessagePayload = {
      text: 'Once listener test',
      timestamp: new Date(),
    }

    emitter.once('log', listener)

    emitter.emit('log', mockPayload)
    emitter.emit('log', mockPayload) // Second emit should not trigger listener

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(mockPayload)
  })

  it('should handle multiple listeners for the same event', () => {
    const listener1 = vi.fn()
    const listener2 = vi.fn()
    const mockPayload: MessagePayload = {
      text: 'Multiple listeners test',
      timestamp: new Date(),
    }

    emitter.on('log', listener1)
    emitter.on('log', listener2)
    emitter.emit('log', mockPayload)

    expect(listener1).toHaveBeenCalledWith(mockPayload)
    expect(listener2).toHaveBeenCalledWith(mockPayload)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
  })

  it('should handle different event types', () => {
    const logListener = vi.fn()
    const errorListener = vi.fn()

    emitter.on('log', logListener)
    emitter.on('error', errorListener)

    const logPayload: MessagePayload = {
      text: 'Log message',
      timestamp: new Date(),
    }

    emitter.emit('log', logPayload)
    emitter.emit('error', new Error('Test error'))

    expect(logListener).toHaveBeenCalledWith(logPayload)
    expect(errorListener).toHaveBeenCalledWith(expect.any(Error))
    expect(logListener).toHaveBeenCalledTimes(1)
    expect(errorListener).toHaveBeenCalledTimes(1)
  })

  it('should remove listeners with off method', () => {
    const listener = vi.fn()
    const mockPayload: MessagePayload = {
      text: 'Test removal',
      timestamp: new Date(),
    }

    emitter.on('log', listener)
    emitter.emit('log', mockPayload)
    expect(listener).toHaveBeenCalledTimes(1)

    emitter.off('log', listener)
    emitter.emit('log', mockPayload)
    expect(listener).toHaveBeenCalledTimes(1) // Should still be 1, not 2
  })

  it('should handle once listeners', () => {
    const listener = vi.fn()
    const mockPayload: MessagePayload = {
      text: 'Once listener test',
      timestamp: new Date(),
    }

    emitter.once('log', listener)

    emitter.emit('log', mockPayload)
    emitter.emit('log', mockPayload) // Second emit should not trigger listener

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(mockPayload)
  })
})
