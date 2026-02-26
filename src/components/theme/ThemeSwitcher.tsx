import { Sun, Moon, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useThemeStore, type ThemeName } from "../../stores/themeStore";
import { cn } from "../../lib/cn";
import { useState, useRef, useEffect } from "react";

const THEMES: { name: ThemeName; label: string; colors: string[] }[] = [
  { name: "sand", label: "themes.sand", colors: ["#f9edd9", "#d68833", "#1aae5a"] },
  { name: "royal", label: "themes.royal", colors: ["#d9e6d9", "#165d31", "#d68833"] },
  { name: "sunset", label: "themes.sunset", colors: ["#f8d3ae", "#e97122", "#b54216"] },
];

interface ThemeSwitcherProps {
  transparent?: boolean;
}

export function ThemeSwitcher({ transparent = false }: ThemeSwitcherProps) {
  const { t } = useTranslation();
  const { theme, mode, setTheme, toggleMode } = useThemeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Dark mode toggle */}
      <button
        onClick={toggleMode}
        className={cn(
          "p-2 rounded-xl transition-colors",
          transparent ? "text-white hover:bg-white/10" : "hover:bg-theme-surface-alt"
        )}
        aria-label={t("nav.darkMode")}
      >
        {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Theme picker */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "p-2 rounded-xl transition-colors",
            transparent ? "text-white hover:bg-white/10" : "hover:bg-theme-surface-alt"
          )}
          aria-label={t("nav.theme")}
        >
          <Palette size={20} />
        </button>

        {open && (
          <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-48 bg-theme-surface border border-theme rounded-xl shadow-xl p-2 z-50 animate-fade-in">
            <p className="text-xs font-medium text-theme-muted px-2 py-1 mb-1">
              {t("nav.theme")}
            </p>
            {THEMES.map((th) => (
              <button
                key={th.name}
                onClick={() => {
                  setTheme(th.name);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors",
                  theme === th.name
                    ? "bg-theme-surface-alt font-semibold"
                    : "hover:bg-theme-surface-alt"
                )}
              >
                <div className="flex gap-0.5">
                  {th.colors.map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-black/10"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="text-theme">{t(th.label)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
