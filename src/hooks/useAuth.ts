import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import User from "../types/User";

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, [addUser, getItem]);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };
  console.log(user);
  return { user, login, logout };
};