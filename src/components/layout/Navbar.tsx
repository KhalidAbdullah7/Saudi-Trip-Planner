import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Compass, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { cn } from "../../lib/cn";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAr = i18n.language === "ar";
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    const newLang = isAr ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/plan", label: t("nav.plan") },
    { to: "/explore", label: t("nav.explore") },
  ];

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent border-transparent"
          : "glass border-b border-theme/50 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300",
              isTransparent ? "bg-white/15 backdrop-blur-sm" : "bg-theme-primary"
            )}>
              <Compass
                size={20}
                className={cn(
                  "group-hover:rotate-45 transition-transform duration-500",
                  isTransparent ? "text-white" : "text-white"
                )}
              />
            </div>
            <span className={cn(
              "font-display font-bold text-lg hidden sm:inline transition-colors duration-300",
              isTransparent ? "text-white" : "text-theme"
            )}>
              {t("app.title")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  location.pathname === link.to
                    ? isTransparent
                      ? "bg-white/20 text-white"
                      : "bg-theme-surface-alt text-theme-primary"
                    : isTransparent
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-theme-muted hover:text-theme hover:bg-theme-surface-alt"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher transparent={isTransparent} />
            <button
              onClick={toggleLang}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-xl border transition-colors",
                isTransparent
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-theme hover:bg-theme-surface-alt text-theme-muted"
              )}
            >
              {t("nav.language")}
            </button>

            {/* Mobile menu button */}
            <button
              className={cn(
                "md:hidden p-2 rounded-xl",
                isTransparent ? "text-white hover:bg-white/10" : "hover:bg-theme-surface-alt"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 animate-slide-up" role="navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "bg-theme-surface-alt text-theme-primary"
                    : "text-theme-muted hover:text-theme hover:bg-theme-surface-alt"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
