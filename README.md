# Learn PubSub

To install dependencies:

```bash
bun install
```

## Lesson 1: Simple Emitter

Features:

- let's try EventEmitter

```bash
bun run src/01-simple-emitter.ts
```

## Lesson 2: Basic PubSub

Features:

- Subscribe to a topic/event name.
- Unsubscribe from a topic/event name.
- Publish a message to a topic and notify all subscribers.

```
bun run src/02-basic-pubsub.ts
```

## Lesson 3: Basic Job Scheduler

Features:

- Schedule a job to run once after a delay.
- Schedule a job to run repeatedly at a fixed interval.

```
bun run src/03-basic-job-scheduler.ts
```

## Troubleshooting

For Zed issue with biome formatting, use this custom formatter settings:

```json
{
  "languages": {
    "TypeScript": {
      "formatter": {
        "external": {
          "command": "./node_modules/@biomejs/biome/bin/biome",
          "arguments": [
            "check",
            "--write",
            "--stdin-file-path",
            "{buffer_path}"
          ]
        }
      }
    }
  }
}
```
