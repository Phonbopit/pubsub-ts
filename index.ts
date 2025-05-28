import emitter from "./01-simple-emitter";

const event = "log";

setTimeout(() => {
  emitter.emit(event, {
    text: "Hello from index.ts file!",
    timestamp: new Date(),
  });
}, 2000);
