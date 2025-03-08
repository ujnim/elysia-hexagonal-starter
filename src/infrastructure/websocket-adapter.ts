import { Elysia, t } from "elysia";
import { messageRepository } from "./database/memory-db";
import { MessageService } from "../application/message-service";

const messageService = new MessageService(messageRepository);

export const websocketAdapter = new Elysia().ws("/ws", {
  open(ws) {
    console.log("New WebSocket connection");
  },
  message: async (ws, data) => {
    if (typeof data === "string") {
      const message = await messageService.sendMessage(data, 1); // Mock senderId
      ws.send(JSON.stringify(message));
    }
  },
  close(ws) {
    console.log("WebSocket connection closed");
  },
});
