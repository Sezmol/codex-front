import { Code2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

const sizeClasses = {
  sm: {
    container: "text-lg",
    icon: "w-5 h-5",
    text: "text-lg font-bold",
  },
  md: {
    container: "text-xl",
    icon: "w-6 h-6",
    text: "text-xl font-bold",
  },
  lg: {
    container: "text-2xl",
    icon: "w-8 h-8",
    text: "text-2xl font-bold",
  },
  xl: {
    container: "text-4xl",
    icon: "w-12 h-12",
    text: "text-4xl font-bold",
  },
};

export const Logo = ({
  size = "md",
  className,
  showText = true,
}: LogoProps) => {
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer group",
        sizeClass.container,
        className,
      )}
    >
      <div
        className={cn(
          "rounded-lg p-2 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:rotate-3 bg-primary",
        )}
      >
        <Code2
          className={cn(
            "transition-all duration-300 group-hover:scale-110 text-secondary",
            sizeClass.icon,
          )}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold leading-tight tracking-tight transition-all duration-300 text-primary",
              sizeClass.text,
            )}
          >
            Code<span className="font-extrabold">X</span>
          </span>
        </div>
      )}
    </div>
  );
};
