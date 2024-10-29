import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
    // Add other user properties here
}

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}


export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => null // No-op function with the correct type
});

const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider