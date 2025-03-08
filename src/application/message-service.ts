import { Message } from "../domain/entities/message";
import { MessageRepository } from "../domain/repositories/message-repository";

export class MessageService {
    constructor(private messageRepository: MessageRepository) { }

    async sendMessage(content: string, senderId: number): Promise<Message> {
        const message = Message.create(content, senderId);
        await this.messageRepository.save(message);
        return message;
    }

    async getAllMessages(): Promise<Message[]> {
        const messages = await this.messageRepository.getAll();
        return messages;
    }
}