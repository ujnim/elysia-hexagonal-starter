import { prisma } from "./prisma-client";
import { Message } from "../../domain/entities/message";
import { MessageRepository } from "../../domain/repositories/message-repository";
import { Logger } from "../logger";

export class PrismaMessageRepository implements MessageRepository {
  async save(message: Message): Promise<void> {
    await prisma.message.create({
      data: {
        content: message.content,
        senderId: message.senderId,
        timestamp: message.timestamp,
      },
    });
  }


  async getAll(): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      select: {
        id: true,
        content: true,
        senderId: true,
        timestamp: true,
      },
    });

    Logger.info("📌 Messages from Database:", messages);
    return messages;
  }
}