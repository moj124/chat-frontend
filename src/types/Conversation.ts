type Conversation = {
    id: number,
    name: string,
    participants: number[],
    messages: number[],
    createdat: Date | string,
    updatedat: Date | string,
    deleteAt: Date | string | null,
};
export default Conversation;