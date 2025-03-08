import { Elysia, t } from "elysia";
import { messageRepository } from "./database/memory-db";
import { MessageService } from "../application/message-service";

const messageService = new MessageService(messageRepository);

export const websocketAdapter = new Elysia().ws("/ws", {
    open(ws) {
        console.log(`New WebSocket connection: ${ws.id}`);
    },
    message: async (ws, data) => {
        if (typeof data === "string") {
            const senderId = parseInt(ws.id) || Math.floor(Math.random() * 1000);
            const message = await messageService.sendMessage(data, senderId);
            ws.send(JSON.stringify(message));
        }
    },
    close(ws) {
        console.log(`WebSocket connection closed: ${ws.id}`);
    },
});
