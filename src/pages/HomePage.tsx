import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe2,
  Map,
  MapPin,
  Mountain,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardDescription, CardTitle } from "../components/ui/Card";
import { fetchHeroSlides, fetchRegions } from "../lib/api";

/* Fallback slides if API is unavailable */
const FALLBACK_SLIDES = [
  {
    id: "f1",
    imageUrl: "https://images.unsplash.com/photo-1586724237569-9c8004f02e04?w=1920&q=80",
    placeName: "Hegra (Madain Salih)",
    placeNameAr: "الحِجر (مدائن صالح)",
    regionSlug: "madinah",
  },
  {
    id: "f2",
    imageUrl: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920&q=80",
    placeName: "Riyadh Skyline",
    placeNameAr: "أفق الرياض",
    regionSlug: "riyadh",
  },
  {
    id: "f3",
    imageUrl: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1920&q=80",
    placeName: "Al-Balad, Jeddah",
    placeNameAr: "البلد، جدة",
    regionSlug: "makkah",
  },
  {
    id: "f4",
    imageUrl: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?w=1920&q=80",
    placeName: "Elephant Rock, AlUla",
    placeNameAr: "صخرة الفيل، العلا",
    regionSlug: "madinah",
  },
  {
    id: "f5",
    imageUrl: "https://images.unsplash.com/photo-1609946860441-a51ffcf22653?w=1920&q=80",
    placeName: "Edge of the World",
    placeNameAr: "حافة العالم",
    regionSlug: "riyadh",
  },
];

const FEATURES = [
  {
    icon: Globe2,
    title: "home.feature1Title",
    desc: "home.feature1Desc",
    gradient: "from-amber-500 to-orange-600",
    accent: "bg-amber-500/10",
  },
  {
    icon: Calendar,
    title: "home.feature2Title",
    desc: "home.feature2Desc",
    gradient: "from-emerald-500 to-teal-600",
    accent: "bg-emerald-500/10",
  },
  {
    icon: Wallet,
    title: "home.feature3Title",
    desc: "home.feature3Desc",
    gradient: "from-blue-500 to-indigo-600",
    accent: "bg-blue-500/10",
  },
  {
    icon: Map,
    title: "home.feature4Title",
    desc: "home.feature4Desc",
    gradient: "from-rose-500 to-pink-600",
    accent: "bg-rose-500/10",
  },
];

const STATS = [
  { value: "13", label: "home.statRegions", icon: Mountain },
  { value: "250+", label: "home.statDestinations", icon: MapPin },
  { value: "6", label: "home.statPlatforms", icon: Star },
  { value: "∞", label: "home.statItineraries", icon: Compass },
];

/* Intersection Observer hook for reveal-on-scroll */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function HomePage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: apiSlides = [] } = useQuery({
    queryKey: ["hero-slides"],
    queryFn: fetchHeroSlides,
  });

  const slides = apiSlides.length > 0 ? apiSlides : FALLBACK_SLIDES;

  const { data: regions = [] } = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });

  const activeSlide = useMemo(() => {
    if (!slides.length) return null;
    return slides[activeIndex % slides.length];
  }, [activeIndex, slides]);

  const goNext = useCallback(() => {
    if (slides.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides]);

  const goPrev = useCallback(() => {
    if (slides.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = window.setInterval(goNext, 6000);
    return () => window.clearInterval(timer);
  }, [slides, isPaused, goNext]);

  /* Reveal refs */
  const statsRef = useReveal<HTMLDivElement>();
  const featuresRef = useReveal<HTMLDivElement>();
  const regionsRef = useReveal<HTMLDivElement>();
  const platformRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <div className="page-enter">
      {/* ═══════ HERO — Full-screen Cinematic ═══════ */}
      <section
        className="relative min-h-screen overflow-hidden flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background images with Ken Burns */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: index === activeIndex ? 1 : 0 }}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center ${index === activeIndex ? "ken-burns" : ""}`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          </div>
        ))}

        {/* Gradient overlays — cinematic layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

        {/* Decorative gradient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 gradient-orb bg-amber-500/20 z-10" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] gradient-orb bg-rose-500/15 z-10" style={{ animationDelay: "-7s" }} />

        {/* Main hero content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
          <div className="max-w-3xl">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs uppercase tracking-[0.2em] border border-white/20 mb-8 animate-slide-up">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              {t("home.badge")}
            </div>

            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[5.5rem] text-white leading-[1.05] tracking-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {t("home.heroTitle1")}
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent drop-shadow-lg">
                {t("home.heroTitle2")}
              </span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t("home.heroSubtitle")}
            </p>

            <div className="mt-12 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.35s" }}>
              <Link to="/plan">
                <Button size="lg" className="text-base px-10 py-4 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow duration-500">
                  {t("app.startPlanning")}
                  <ArrowRight size={18} className="ml-1" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <Compass size={18} className="mr-1" />
                  {t("app.explore")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Location badge — floating card */}
          {activeSlide && (
            <div className="absolute bottom-32 sm:bottom-36 right-4 sm:right-8 lg:right-12 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="glass-strong rounded-2xl px-5 py-3 text-white flex items-center gap-3 shadow-2xl hover-lift shine-hover">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {isAr ? activeSlide.placeNameAr : activeSlide.placeName}
                  </p>
                  <p className="text-[11px] text-white/60 capitalize">{activeSlide.regionSlug.replace(/-/g, " ")}</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide navigation */}
          <div className="absolute bottom-12 left-4 sm:left-8 lg:left-12 z-30 flex items-center gap-4">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2 items-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-10 h-2.5 bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg shadow-amber-400/40"
                      : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>

            <span className="text-white/40 text-xs font-mono ml-2 tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Bottom fade into content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgb(var(--color-bg))] to-transparent z-20 pointer-events-none" />
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="relative -mt-20 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={statsRef} className="reveal glass rounded-3xl border border-white/10 shadow-2xl p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-theme-primary/10 to-theme-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                  <stat.icon size={24} className="text-theme-primary" />
                </div>
                <p className="font-display font-extrabold text-4xl text-gradient count-up">{stat.value}</p>
                <p className="text-xs text-theme-muted mt-2 uppercase tracking-wider font-medium">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES — Premium Glass cards ═══════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
        {/* Decorative orb */}
        <div className="absolute top-10 right-0 w-72 h-72 gradient-orb bg-theme-primary/10 pointer-events-none" />

        <div ref={featuresRef} className="reveal">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-semibold uppercase tracking-wider mb-4">
              {t("home.whyTitle")}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-theme">
              {t("home.whyTitle")}
            </h2>
            <p className="mt-4 text-theme-muted text-lg max-w-2xl mx-auto leading-relaxed">{t("home.whySubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {FEATURES.map((feature) => (
              <Card key={feature.title} hover className="group relative overflow-hidden shine-hover">
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-28 h-28 rounded-bl-[80px] bg-gradient-to-br ${feature.gradient} opacity-[0.07] group-hover:opacity-[0.15] group-hover:w-32 group-hover:h-32 transition-all duration-700`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <CardTitle className="text-base font-bold">{t(feature.title)}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{t(feature.desc)}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ REGIONS SHOWCASE ═══════ */}
      {regions.length > 0 && (
        <section className="relative bg-gradient-subtle py-24 overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 gradient-orb bg-theme-accent/10 pointer-events-none" />

          <div ref={regionsRef} className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-theme-accent/10 text-theme-accent text-xs font-semibold uppercase tracking-wider mb-4">
                  {t("home.regionsTitle")}
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-theme">
                  {t("home.regionsTitle")}
                </h2>
                <p className="mt-3 text-theme-muted text-lg">{t("home.regionsSubtitle")}</p>
              </div>
              <Link to="/explore" className="hidden sm:inline-flex items-center gap-2 text-theme-primary font-semibold hover:gap-3 transition-all duration-300 group">
                {t("home.viewAll")} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {regions.slice(0, 6).map((region) => (
                <Link
                  key={region.slug}
                  to={`/explore?region=${region.slug}`}
                  className="group relative h-64 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 shine-hover"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] group-hover:scale-110"
                    style={{ backgroundImage: `url(${region.imageUrl || "https://images.unsplash.com/photo-1586724237569-9c8004f02e04?w=800"})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display font-bold text-xl text-white">
                      {isAr ? region.nameAr : region.nameEn}
                    </h3>
                    <p className="text-white/70 text-sm mt-1 line-clamp-1">
                      {isAr ? region.descAr : region.descEn}
                    </p>
                    {region._count && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium">
                        <MapPin size={12} />
                        {region._count.destinations} {t("home.destinations")}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link to="/explore">
                <Button variant="outline">{t("home.viewAll")} <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ PLATFORMS BANNER ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div ref={platformRef} className="reveal relative rounded-3xl overflow-hidden bg-theme-surface border border-theme shadow-xl p-10 sm:p-14 shine-hover">
          {/* Decorative gradient streak */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-theme-primary/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 gradient-orb bg-theme-accent/8 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 flex items-center justify-center">
                  <TrendingUp size={16} className="text-theme-primary" />
                </div>
                <span className="text-xs font-semibold text-theme-primary uppercase tracking-wider">{t("home.platformBadge")}</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-theme">{t("home.platformTitle")}</h2>
              <p className="mt-4 text-theme-muted leading-relaxed text-base">{t("home.platformDesc")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Google Maps", "TripAdvisor", "Viator", "GetYourGuide", "Klook", "Official Sites"].map((p) => (
                <span key={p} className="px-5 py-2.5 rounded-2xl bg-theme-surface-alt border border-theme text-sm font-semibold text-theme-muted hover:text-theme-primary hover:border-theme-primary/30 hover:shadow-md transition-all duration-300 cursor-default">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div ref={ctaRef} className="reveal relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          {/* Animated orbs inside CTA */}
          <div className="absolute top-6 right-12 w-40 h-40 rounded-full bg-white/10 float-slow pointer-events-none blur-2xl" />
          <div className="absolute bottom-4 left-16 w-24 h-24 rounded-full bg-white/15 float-delayed pointer-events-none blur-xl" />
          <div className="relative z-10 text-center py-20 sm:py-24 px-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6">
              <Users size={28} className="text-white" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">{t("home.ctaTitle")}</h2>
            <p className="mt-5 text-white/80 text-lg max-w-xl mx-auto leading-relaxed">{t("home.ctaDesc")}</p>
            <Link to="/plan" className="inline-block mt-10">
              <Button
                size="lg"
                className="bg-white text-amber-700 hover:bg-white/90 shadow-2xl shadow-black/20 px-12 py-5 text-base font-bold hover:scale-105 transition-transform duration-300"
              >
                {t("home.ctaButton")} <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

