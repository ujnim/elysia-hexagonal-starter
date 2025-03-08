export class Message {
  constructor(
    public id: number,
    public content: string,
    public senderId: number,
    public timestamp: Date
  ) { }

  static create(content: string, senderId: number): Message {
    return new Message(
      Math.floor(Math.random() * 100000),
      content,
      senderId,
      new Date()
    );
  }
}