import { Elysia } from "elysia";

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      console.log("✅ Client Connected!");
    },
    message(ws, message) {
      console.log("📩 Received:", message);
      ws.send(`Echo: ${message}`);
    },
    close(ws) {
      console.log("❌ Client Disconnected!");
    }
  })
  .get('/', () => 'Hello Elysia')
  .get('/hello', 'Do you miss me?') 
  .listen(3001);

console.log("🚀 WebSocket server running on ws://localhost:3001/ws");
