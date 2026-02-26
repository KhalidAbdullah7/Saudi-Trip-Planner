import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 ring-theme-primary ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]",
          {
            "bg-theme-primary text-white hover:bg-theme-primary-hover shadow-lg hover:shadow-xl hover:shadow-[rgb(var(--color-primary)/0.25)]":
              variant === "primary",
            "bg-theme-surface-alt text-theme hover:opacity-80 border border-theme shadow-sm":
              variant === "secondary",
            "text-theme-primary hover:bg-theme-surface-alt":
              variant === "ghost",
            "border-2 border-theme text-theme hover:bg-theme-surface-alt hover:border-theme-primary/30":
              variant === "outline",
          },
          {
            "px-3.5 py-1.5 text-sm": size === "sm",
            "px-6 py-2.5 text-base": size === "md",
            "px-8 py-3.5 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
