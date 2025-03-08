import { Message } from "../../domain/entities/message";
import { MessageRepository } from "../../domain/repositories/message-repository";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user-repository";

class InMemoryMessageRepository implements MessageRepository {
  private messages: Message[] = [];

  async save(message: Message): Promise<void> {
    this.messages.push(message);
  }

  async getAll(): Promise<Message[]> {
    return this.messages;
  }
}

class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null;
  }
}

export const messageRepository = new InMemoryMessageRepository();
export const userRepository = new InMemoryUserRepository();