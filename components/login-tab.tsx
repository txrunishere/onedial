import { useState } from "react";
import { Eye, EyeOff, Smartphone, LogIn, Computer } from "lucide-react";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";

type LoginTabProps = {
  setIsRegisterTab: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginTab = ({ setIsRegisterTab }: LoginTabProps) => {
  const [device, setDevice] = useState<"personal" | "borrowed">("personal");

  const handleRegisterTabNavigation = () => setIsRegisterTab(true);

  return (
    <div className="px-4 sm:px-10">
      <p className="mb-4 text-center text-gray-400">Which device is this?</p>

      <div className="mb-6 flex overflow-hidden rounded-full border border-gray-600">
        <button
          onClick={() => setDevice("personal")}
          className={`flex flex-1 items-center justify-center gap-2 py-2 text-sm transition ${
            device === "personal" ? "bg-gray-600 text-white" : "text-gray-400"
          }`}
        >
          <Smartphone size={16} />
          My device
        </button>

        <button
          onClick={() => setDevice("borrowed")}
          className={`flex flex-1 items-center justify-center gap-2 py-2 text-sm transition ${
            device === "borrowed" ? "bg-gray-600 text-white" : "text-gray-400"
          }`}
        >
          <Computer size={16} />
          Borrowed device
        </button>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-400">ALIAS</label>
        <Input placeholder="s.ample.96" type="text" />
      </div>

      <div className="relative mb-6">
        <label className="mb-2 block text-sm text-gray-400">PIN</label>
        <PasswordInput placeholder="••••••" />
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-300 py-3 text-sm font-bold text-blue-800 transition hover:opacity-90">
        <LogIn className="h-4 w-4 font-bold" />
        Sign in
      </button>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p
          onClick={handleRegisterTabNavigation}
          className="mt-2 cursor-pointer hover:text-white"
        >
          New here? Create account
        </p>
      </div>
    </div>
  );
};
