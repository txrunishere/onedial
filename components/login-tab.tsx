import { useEffect, useState } from "react";
import { Smartphone, LogIn, Computer } from "lucide-react";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { loginUserAction } from "@/lib/actions";
import { toast } from "sonner";
import { useUser } from "@/context/user-context";

type LoginErrors = {
  alias?: string[] | undefined;
  pin?: string[] | undefined;
};

type LoginTabProps = {
  setIsRegisterTab: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginTab = ({ setIsRegisterTab }: LoginTabProps) => {
  const [device, setDevice] = useState<"personal" | "borrowed">("personal");
  const [alias, setAlias] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const { setUser, setContactDevice } = useUser();

  useEffect(() => {
    if (password.length > 6) {
      setPassword(password.substring(0, 6));
    }
  }, [password, setPassword]);

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAlias(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLoginUser = async () => {
    setErrors(null);
    setContactDevice(null);
    const response = await loginUserAction({
      alias,
      pin: password,
    });

    if (!response.success) {
      if (typeof response.error === "object") {
        setErrors(response.error);
        return;
      }
      toast.error(response.error);
      return;
    }

    setUser(response.user);
    setContactDevice(device);
    toast.success("Login Success!");
  };

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
        <Input
          placeholder="s.ample.96"
          type="text"
          value={alias}
          onChange={handleAliasChange}
        />
        <p className="mt-1 text-sm text-red-500">{errors?.alias?.[0]}</p>
      </div>

      <div className="relative mb-6">
        <label className="mb-2 block text-sm text-gray-400">PIN</label>
        <PasswordInput
          placeholder="••••••"
          value={password}
          onChange={handlePasswordChange}
        />
        <p className="mt-1 text-sm text-red-500">{errors?.pin?.[0]}</p>
      </div>

      <button
        onClick={handleLoginUser}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-300 py-3 text-sm font-bold text-blue-800 transition hover:opacity-90"
      >
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
