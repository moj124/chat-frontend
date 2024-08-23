import axios from "axios";

const fetchConversationList = async () => {
    try {
        const { data: response } = await
            axios.get(import.meta.env.VITE_BASE_URL+'conversation/');
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export default fetchConversationList;