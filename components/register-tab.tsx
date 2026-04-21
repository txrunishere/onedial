import { ChangeEvent, useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { registerUserAction } from "@/lib/actions";
import { toast } from "sonner";

type RegisterTabProps = {
  setIsRegisterTab: React.Dispatch<React.SetStateAction<boolean>>;
};

type RegisterError = {
  firstName?: string[] | undefined;
  email?: string[] | undefined;
  alias?: string[] | undefined;
  pin?: string[] | undefined;
  confirmPin?: string[] | undefined;
};

export const RegisterTab = ({ setIsRegisterTab }: RegisterTabProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<RegisterError | null>(null);

  useEffect(() => {
    if (password.length > 6) {
      setPassword(password.substring(0, 6));
    }
  }, [password, setPassword]);

  useEffect(() => {
    if (confirmPassword.length > 6) {
      setConfirmPassword(confirmPassword.substring(0, 6));
    }
  }, [confirmPassword, setConfirmPassword]);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleAliasChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAlias(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const handleRegisterUser = async () => {
    setErrors(null);
    const response = await registerUserAction({
      firstName,
      email,
      alias,
      pin: password,
      confirmPin: confirmPassword,
    });

    console.log(response);

    if (!response.success) {
      if (typeof response.error === "object") {
        setErrors(response.error);
        return;
      }
      toast.error(response.error);
      return;
    }

    toast.success("Register Success!");
  };

  const handleLoginNavigation = () => setIsRegisterTab(false);

  return (
    <div className="px-4 sm:px-10">
      <div className="mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          FIRST NAME
        </label>
        <Input
          placeholder="Your first name"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors && errors.firstName?.[0]}
        </p>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          EMAIL
        </label>
        <Input
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors && errors.email?.[0]}
        </p>
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          ALIAS
        </label>
        <Input
          type="text"
          placeholder="e.g. s.ample96"
          value={alias}
          onChange={handleAliasChange}
        />

        <p className="mt-1 text-xs text-gray-500">
          Min. 6 characters. Letters, numbers, -, _ only.
        </p>
        <p className="mt-1 text-sm text-red-500">
          {errors && errors.alias?.[0]}
        </p>
      </div>

      <div className="relative mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          CREATE PIN
        </label>
        <PasswordInput
          placeholder="••••••"
          value={password}
          onChange={handlePasswordChange}
        />
        <p className="mt-1 text-sm text-red-500">{errors && errors.pin?.[0]}</p>
      </div>

      <div className="relative mb-6">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          CONFIRM PIN
        </label>
        <PasswordInput
          placeholder="••••••"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors && errors.confirmPin?.[0]}
        </p>
      </div>

      <button
        onClick={handleRegisterUser}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-300 py-3 text-sm font-bold text-blue-800 transition hover:opacity-90"
      >
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
