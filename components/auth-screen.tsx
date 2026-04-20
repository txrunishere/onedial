"use client";

import { useState } from "react";
import { RegisterTab } from "./register-tab";
import { LoginTab } from "./login-tab";
import { ContactsLogo } from "./ui/contacts-logo";

export const AuthScreen = () => {
  const [isRegisterTab, setIsRegisterTab] = useState<boolean>(false);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div>
        <div className="w-20">
          <ContactsLogo />
        </div>
      </div>
      <div>{isRegisterTab ? <RegisterTab /> : <LoginTab />}</div>
    </div>
  );
};
