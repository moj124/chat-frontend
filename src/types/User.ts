type User = {
   id: number;
   username: string;
   password: string; 
   firstName: string; 
   lastName: string;
};
export default User;

export type FormUser = Pick<User, 'username' | 'password'>;

export type FormRegister = Omit<User, "id">;