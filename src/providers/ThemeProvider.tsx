import { useEffect, type ReactNode } from "react";
import { useThemeStore } from "../stores/themeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, mode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    // Set dark class
    root.classList.toggle("dark", mode === "dark");
    // Set theme data attribute
    if (theme === "sand") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme, mode]);

  return <>{children}</>;
}
