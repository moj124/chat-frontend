import axios from "axios";
import { FormRegister } from "../types/User";

const register = async (data: FormRegister) => {
    const { data: response } = await
    axios.put(import.meta.env.VITE_BASE_URL+'users/register', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

return response.data;
}
export default register;