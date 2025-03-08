import { Message } from "../domain/entities/message";
import { MessageRepository } from "../domain/repositories/message-repository";

export class WebSocketService {
  private clients = new Set<WebSocket>();

  constructor(private messageRepository: MessageRepository) {}

  addClient(client: WebSocket) {
    this.clients.add(client);
    console.log(`New client connected. Total clients: ${this.clients.size}`);

    client.onclose = () => {
      this.clients.delete(client);
      console.log(`Client disconnected. Remaining: ${this.clients.size}`);
    };
  }

  async broadcastMessage(content: string, senderId: number) {
    const message = Message.create(content, senderId);
    await this.messageRepository.save(message);

    const messageData = JSON.stringify({
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      timestamp: message.timestamp,
    });

    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageData);
      }
    }
  }
}
