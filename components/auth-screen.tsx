"use client";

import { useState } from "react";
import { RegisterTab } from "./register-tab";
import { LoginTab } from "./login-tab";
import { ContactsLogo } from "./ui/contacts-logo";

export const AuthScreen = () => {
  const [isRegisterTab, setIsRegisterTab] = useState<boolean>(false);

  return (
    <div className="mt-10 flex flex-col gap-6">
      <div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 text-center">
            <ContactsLogo />
          </div>
          <h3 className="text-3xl font-bold">One Dial</h3>
        </div>
      </div>
      <div>
        {isRegisterTab ? (
          <RegisterTab setIsRegisterTab={setIsRegisterTab} />
        ) : (
          <LoginTab setIsRegisterTab={setIsRegisterTab} />
        )}
      </div>
    </div>
  );
};
