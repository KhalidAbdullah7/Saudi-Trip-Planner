import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-theme-surface-alt text-theme-muted": variant === "default",
          "bg-theme-primary text-white": variant === "primary",
          "bg-theme-accent text-white": variant === "accent",
          "border border-theme text-theme-muted": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
