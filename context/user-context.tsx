"use client";

import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: any | null;
  contactDevice: "personal" | "borrowed" | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setContactDevice: React.Dispatch<
    React.SetStateAction<"personal" | "borrowed" | null>
  >;
};

const UserContext = createContext<UserContextType>({
  user: null,
  contactDevice: null,
  setContactDevice: () => {},
  setUser: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  const [contactDevice, setContactDevice] = useState<
    "personal" | "borrowed" | null
  >(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        contactDevice,
        setContactDevice,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
