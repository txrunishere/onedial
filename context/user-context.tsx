"use client";

import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
