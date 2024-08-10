import axios from "axios";
import formRegister from "../types/formRegister";

const register = async (data: formRegister) => {
    const { data: response } = await
    axios.post(import.meta.env.VITE_BASE_URL+'users/register', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

return response.data;
}
export default register;