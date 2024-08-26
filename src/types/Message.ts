type Message = {
  id: number;
  userId: number;
  conversationId: number;
  message: string;
  createdat: Date | string;
  updatedat: Date | string;
  deleteAt: Date | string | null;
}
export default Message;