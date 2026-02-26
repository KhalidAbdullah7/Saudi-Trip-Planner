import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Compass, Github, Globe, Heart, MapPin, Send } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-theme bg-theme-surface/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-theme-primary flex items-center justify-center">
                <Compass size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-theme">{t("app.title")}</span>
            </div>
            <p className="text-sm text-theme-muted leading-relaxed">{t("app.tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-theme mb-3 text-sm uppercase tracking-wider">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li><Link to="/plan" className="text-sm text-theme-muted hover:text-theme-primary transition-colors">{t("nav.plan")}</Link></li>
              <li><Link to="/explore" className="text-sm text-theme-muted hover:text-theme-primary transition-colors">{t("nav.explore")}</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-semibold text-theme mb-3 text-sm uppercase tracking-wider">{t("footer.platforms")}</h3>
            <ul className="space-y-2">
              {["Google Maps", "TripAdvisor", "Viator", "GetYourGuide", "Klook"].map((p) => (
                <li key={p}><span className="text-sm text-theme-muted">{p}</span></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-theme mb-3 text-sm uppercase tracking-wider">{t("footer.about")}</h3>
            <p className="text-sm text-theme-muted leading-relaxed">{t("footer.aboutDesc")}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-theme-muted/60">
            © {new Date().getFullYear()} {t("app.title")}. {t("footer.rights")}
          </p>
          <p className="text-xs text-theme-muted/60 flex items-center gap-1">
            {t("footer.madeWith")} <Heart size={12} className="text-red-400" /> {t("footer.inSaudi")}
          </p>
        </div>
      </div>
    </footer>
  );
}
