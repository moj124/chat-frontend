import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import User from "../types/User";

export const useUser = () => {
    const authContext = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: User) => {
        console.log('addUser',user);
        authContext.user = user;
        setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
        authContext.user = null;
        setItem('user', '');
    };
    // console.log('user useUser', user)
    return { user: authContext.user, addUser, removeUser };
};