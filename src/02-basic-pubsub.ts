type Listener<T = unknown> = (data: T) => void

interface IPubSub {
  subscribe<T>(event: string, listener: Listener<T>): () => void
  unsubscribe(event: string, listener: Listener): void
  publish<T>(event: string, data: T): void
}

class InMemoryPubSub implements IPubSub {
  private topics: Map<string, Set<Listener>> = new Map()

  subscribe<T>(topic: string, listener: Listener<T>): () => void {
    let listeners = this.topics.get(topic)
    if (!listeners) {
      listeners = new Set()
      this.topics.set(topic, listeners)
    }
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  publish<T>(topic: string, data: T): void {
    const listeners = this.topics.get(topic)
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(data)
        } catch (error) {
          console.error(`Error in listener for topic ${topic}:`, error)
        }
      }
    }
  }

  unsubscribe(event: string, listener: Listener): void {
    const listeners = this.topics.get(event)
    if (listeners) {
      listeners.delete(listener)
    }
  }
}

// Usage:
// type Greeting = { message: string };

// const pubSub = new InMemoryPubSub();
// const unsubscribe = pubSub.subscribe<Greeting>("greeting", (message) =>
//   console.log("Received message:", message),
// );

// pubSub.publish("greeting", { message: "Ahoy!" });

// unsubscribe();
