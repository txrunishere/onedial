import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";

type RegisterTabProps = {
  setIsRegisterTab: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterTab = ({ setIsRegisterTab }: RegisterTabProps) => {
  const handleLoginNavigation = () => setIsRegisterTab(false);

  return (
    <div className="px-4 sm:px-10">
      <div className="mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          FIRST NAME
        </label>
        <Input placeholder="Your first name" type="text" />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          EMAIL
        </label>
        <Input placeholder="you@example.com" type="email" />
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          ALIAS
        </label>
        <Input type="text" placeholder="e.g. s.ample96" />

        <p className="mt-2 text-xs text-gray-500">
          Min. 6 characters. Letters, numbers, -, _ only.
        </p>
      </div>

      <div className="relative mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          CREATE PIN
        </label>
        <PasswordInput placeholder="••••••" />
      </div>

      <div className="relative mb-6">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          CONFIRM PIN
        </label>
        <PasswordInput placeholder="••••••" />
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-300 py-3 text-sm font-bold text-blue-800 transition hover:opacity-90">
        <UserPlus className="h-4 w-4 font-bold" />
        Create account
      </button>

      <p
        onClick={handleLoginNavigation}
        className="mt-4 cursor-pointer text-center text-sm text-gray-400 hover:text-white"
      >
        Already have an account? Sign in
      </p>
    </div>
  );
};
