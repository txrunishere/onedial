import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";

type RegisterTabProps = {
  setIsRegisterTab: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterTab = ({ setIsRegisterTab }: RegisterTabProps) => {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleLoginNavigation = () => setIsRegisterTab(false);

  return (
    <div className="px-4 sm:px-10">
      <div className="mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          FIRST NAME
        </label>
        <input
          type="text"
          placeholder="Your first name"
          className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          EMAIL
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      <div className="mb-2">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          ALIAS
        </label>
        <input
          type="text"
          placeholder="e.g. j.smith92"
          className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <p className="mt-2 text-xs text-gray-500">
          Min. 6 characters. Letters, numbers, -, _ only.
        </p>
      </div>

      <div className="relative mb-4">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          CREATE PIN
        </label>
        <input
          type={showPin ? "text" : "password"}
          placeholder="••••••"
          className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPin(!showPin)}
          className="absolute top-10 right-3 text-gray-400 hover:text-white"
        >
          {showPin ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      <div className="relative mb-6">
        <label className="mb-2 block text-xs tracking-wide text-gray-400">
          CONFIRM PIN
        </label>
        <input
          type={showConfirmPin ? "text" : "password"}
          placeholder="••••••"
          className="w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPin(!showConfirmPin)}
          className="absolute top-10 right-3 text-gray-400 hover:text-white"
        >
          {showConfirmPin ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
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
