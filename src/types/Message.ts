type Message = {
  id: number;
  userId: number;
  conversationId: number;
  message: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deleteAt: Date | string | null;
}
export default Message;