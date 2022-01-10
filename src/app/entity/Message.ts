class Message{
  id: number;
  sentAt: Date;
  msg: string;
  user: User;
  conversation: Conversation;

  constructor(id: number, sentAt: Date, msg: string, user: User, conversation: Conversation) {
    this.id = id;
    this.sentAt = sentAt;
    this.msg = msg;
    this.conversation = conversation;
    this.user = user;
  }
}
