import axios from "axios";
import User from "../types/User";
import formUser from "../types/formUser";

const loginUser = async (inputData: formUser): Promise<User> => {
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