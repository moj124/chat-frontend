import axios from "axios";
import User, { FormUser } from "../types/User";

const loginUser = async (inputData: FormUser): Promise<User> => {
    try {
        const { data: response } = await
            axios.post(import.meta.env.VITE_BASE_URL+'users/login', inputData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export default loginUser;