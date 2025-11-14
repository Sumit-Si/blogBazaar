import { useEffect, useState } from "react";
import type { User } from "@/types";

export type UserResponse = Pick<User, 'username' | 'email' | 'role'>;

const useUser = () => {
  const [user,setUser] = useState<UserResponse>();

  useEffect(() => {
    const userJSON = localStorage.getItem('user');

    if(userJSON) {
        const user = JSON.parse(userJSON) as UserResponse;

        setUser(user);
    }
  }, []);

  return user;
}

export default useUser;