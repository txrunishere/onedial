import { cn } from "@/lib/cn";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InputProps = {
  placeholder: string;
  type?: string;
  className?: string;
  max?: number;
  min?: number;
  isDisabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput = ({
  className,
  isDisabled,
  placeholder,
  max,
  min,
  value,
  onChange,
}: InputProps) => {
  const [showPin, setShowPin] = useState(false);

  return (
    <>
      <input
        type={showPin ? "text" : "password"}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none",
          className,
        )}
        min={min}
        max={max}
        disabled={isDisabled}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={() => setShowPin(!showPin)}
        className="absolute top-10 right-3 text-gray-400 hover:text-white"
      >
        {showPin ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </>
  );
};
