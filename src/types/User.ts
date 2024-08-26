type User = {
   id: number;
   username: string;
   password: string; 
   firstname: string; 
   lastname: string;
};
export default User;

export type FormUser = Pick<User, 'username' | 'password'>;

export type FormRegister = Omit<User, "id">;