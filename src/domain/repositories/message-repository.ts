import { Message } from "../entities/message";

export interface MessageRepository {
    save(message: Message): Promise<void>;
    getAll(): Promise<Message[]>;
}