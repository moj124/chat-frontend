type Conversation = {
    id: number,
    name: string,
    participants: number[],
    messages: number[],
    createdAt: Date | string,
    updatedAt: Date | string,
    deleteAt: Date | string | null,
};
export default Conversation;