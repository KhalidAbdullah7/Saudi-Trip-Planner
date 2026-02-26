import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "sand" | "royal" | "sunset";
export type ThemeMode = "light" | "dark";

interface ThemeState {
  theme: ThemeName;
  mode: ThemeMode;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "sand",
      mode: "light",
      setTheme: (theme) => set({ theme }),
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    { name: "stp-theme" }
  )
);
