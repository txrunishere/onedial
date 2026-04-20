import { cn } from "@/lib/cn";

type InputProps = {
  placeholder: string;
  type: string;
  className?: string;
  max?: number;
  min?: number;
  isDisabled?: boolean;
};

export const Input = ({
  className,
  isDisabled,
  placeholder,
  type,
  max,
  min,
}: InputProps) => {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-gray-600 bg-transparent px-4 py-3 pr-12 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none",
        className,
      )}
      disabled={isDisabled}
      placeholder={placeholder}
      type={type}
      max={max}
      min={min}
    />
  );
};
