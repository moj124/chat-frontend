import { createContext } from "react";
import User from "../types/User";

type AuthContext = {
    user: User | null;
};

export const AuthContext = createContext<AuthContext>({
    user: null,
});