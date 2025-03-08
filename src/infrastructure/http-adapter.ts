import { Elysia } from "elysia";
import { MessageService } from "../application/message-service";
import { PrismaMessageRepository } from "./database/message-repository";

const messageRepository = new PrismaMessageRepository();
const messageService = new MessageService(messageRepository);

export const httpAdapter = new Elysia()
    .get("/messages", async () => {
        const messages = await messageService.getAllMessages();
        return messages;
    })
    .get("/", () => "Hello from HTTP!")
    .get("/health", () => ({ status: "ok" }));