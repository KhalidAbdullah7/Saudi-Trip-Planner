import { useMemo, useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchDestinations, fetchRegions } from "../lib/api";
import { Badge } from "../components/ui/Badge";
import { Card, CardDescription, CardTitle } from "../components/ui/Card";
import {
  Clock,
  ExternalLink,
  Filter,
  Globe,
  MapPin,
  Search,
  Sparkles,
  Star,
  Tag,
  X,
} from "lucide-react";

const PLATFORM_META: Record<string, { label: string; color: string; icon: string }> = {
  googleMapsUrl: { label: "Google Maps", color: "text-blue-600", icon: "🗺️" },
  tripAdvisorUrl: { label: "TripAdvisor", color: "text-green-600", icon: "🦉" },
  viatorUrl: { label: "Viator", color: "text-indigo-600", icon: "🎫" },
  getYourGuideUrl: { label: "GetYourGuide", color: "text-orange-600", icon: "🧭" },
  klookUrl: { label: "Klook", color: "text-orange-500", icon: "🎪" },
  officialUrl: { label: "Official Site", color: "text-theme-primary", icon: "🌐" },
};

const CATEGORIES = [
  "ATTRACTION", "RESTAURANT", "CAFE", "NATURE", "ADVENTURE", "EVENT", "SHOPPING", "HOTEL",
];

export function ExplorePage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRegion = searchParams.get("region") || "";
  const selectedCategory = searchParams.get("category") || "";
  const isAr = i18n.language === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });

  const { data: destinations, isLoading } = useQuery({
    queryKey: ["destinations", selectedRegion, selectedCategory],
    queryFn: () =>
      fetchDestinations({
        ...(selectedRegion ? { region: selectedRegion } : {}),
        ...(selectedCategory ? { category: selectedCategory } : {}),
      }),
  });

  const sortedDestinations = useMemo(() => {
    let list = destinations || [];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.nameEn.toLowerCase().includes(q) ||
          d.nameAr.includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.descEn.toLowerCase().includes(q)
      );
    }
    return list.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [destinations, searchQuery]);

  const totalPlatformLinks = useMemo(() => {
    if (!destinations) return 0;
    return destinations.reduce((acc, d) => {
      const links = [d.googleMapsUrl, d.tripAdvisorUrl, d.viatorUrl, d.getYourGuideUrl, d.klookUrl, d.officialUrl];
      return acc + links.filter(Boolean).length;
    }, 0);
  }, [destinations]);

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <div className="page-enter min-h-screen bg-gradient-subtle">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 right-1/4 w-96 h-96 gradient-orb bg-theme-primary/6" />
        <div className="absolute bottom-20 -left-32 w-80 h-80 gradient-orb bg-theme-accent/6" style={{ animationDelay: "-12s" }} />
      </div>

      {/* Hero header */}
      <div className="relative z-10 bg-theme-bg/80 backdrop-blur-xl border-b border-theme pb-8 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles size={12} className="animate-pulse" />
                {t("explore.title")}
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-theme">{t("explore.title")}</h1>
              <p className="mt-3 text-theme-muted text-lg">{t("explore.subtitle")}</p>
            </div>
            <div className="flex items-center gap-5 text-sm text-theme-muted">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-theme-surface border border-theme shadow-sm">
                <MapPin size={14} className="text-theme-primary" />
                <span className="font-semibold text-theme">{sortedDestinations.length}</span> {t("explore.placesFound")}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-theme-surface border border-theme shadow-sm">
                <Globe size={14} className="text-theme-accent" />
                <span className="font-semibold text-theme">{totalPlatformLinks}</span> {t("explore.platformLinks")}
              </span>
            </div>
          </div>

          {/* Search & filter bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("explore.searchPlaceholder")}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-theme bg-theme-surface text-theme placeholder:text-theme-muted/50 focus:outline-none focus:ring-2 ring-theme-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-medium transition-all duration-300 ${
                showFilters || selectedCategory
                  ? "border-theme-primary bg-theme-primary/10 text-theme-primary shadow-md"
                  : "border-theme text-theme-muted hover:border-theme-primary hover:shadow-sm"
              }`}
            >
              <Filter size={16} />
              {t("explore.filters")}
              {selectedCategory && <Badge variant="primary" className="ml-1 text-[10px]">1</Badge>}
            </button>
          </div>

          {/* Category filter */}
          {showFilters && (
            <div className="mt-4 p-5 rounded-2xl bg-theme-surface border border-theme shadow-lg animate-slide-up">
              <p className="text-xs font-semibold text-theme-muted mb-4 uppercase tracking-wider">{t("explore.filterByCategory")}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("category", "")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-300 ${
                    !selectedCategory ? "bg-gradient-to-r from-theme-primary to-theme-accent text-white border-transparent shadow-md" : "border-theme text-theme-muted hover:border-theme-primary hover:shadow-sm"
                  }`}
                >
                  {t("explore.allCategories")}
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter("category", cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-300 ${
                      selectedCategory === cat ? "bg-gradient-to-r from-theme-primary to-theme-accent text-white border-transparent shadow-md" : "border-theme text-theme-muted hover:border-theme-primary hover:shadow-sm"
                    }`}
                  >
                    {cat.charAt(0) + cat.slice(1).toLowerCase().replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Region sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-20 bg-theme-surface rounded-2xl border border-theme p-4 shadow-sm">
              <h2 className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-4 px-2">{t("explore.regions")}</h2>
              <div className="flex flex-wrap lg:flex-col gap-1">
                <button
                  onClick={() => setFilter("region", "")}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-300 ${
                    !selectedRegion
                      ? "bg-gradient-to-r from-theme-primary to-theme-accent text-white shadow-lg"
                      : "text-theme-muted hover:bg-theme-surface-alt"
                  }`}
                >
                  {t("explore.allRegions")}
                </button>
                {regions?.map((r) => (
                  <button
                    key={r.slug}
                    onClick={() => setFilter("region", r.slug)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-300 flex items-center justify-between gap-2 ${
                      selectedRegion === r.slug
                        ? "bg-gradient-to-r from-theme-primary to-theme-accent text-white shadow-lg"
                        : "text-theme-muted hover:bg-theme-surface-alt"
                    }`}
                  >
                    <span>{isAr ? r.nameAr : r.nameEn}</span>
                    {r._count && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedRegion === r.slug ? "bg-white/20 text-white" : "bg-theme-surface-alt text-theme-muted"
                      }`}>
                        {r._count.destinations}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Destination grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-3xl shimmer" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 stagger-children">
                {sortedDestinations.map((dest) => (
                  <Card key={dest.id} hover className="group overflow-hidden shine-hover">
                    {/* Image header */}
                    <div className="relative -mx-6 -mt-6 mb-5 h-40 bg-gradient-to-br from-theme-primary/20 via-theme-accent/10 to-theme-surface-alt overflow-hidden">
                      {dest.imageUrl && (
                        <img
                          src={dest.imageUrl}
                          alt={isAr ? dest.nameAr : dest.nameEn}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <h3 className="font-display font-bold text-white text-lg leading-tight line-clamp-2 drop-shadow-lg">
                          {isAr ? dest.nameAr : dest.nameEn}
                        </h3>
                        <Badge variant="primary" className="shrink-0 ml-2 text-[10px] shadow-md">
                          {dest.category.charAt(0) + dest.category.slice(1).toLowerCase()}
                        </Badge>
                      </div>
                    </div>

                    <CardDescription className="line-clamp-2 text-sm">{isAr ? dest.descAr : dest.descEn}</CardDescription>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dest.tags.slice(0, 5).map((tag) => (
                        <Badge key={tag} className="text-[10px]">{tag}</Badge>
                      ))}
                      {dest.tags.length > 5 && (
                        <Badge className="text-[10px]">+{dest.tags.length - 5}</Badge>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-theme-muted">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {isAr ? dest.region?.nameAr : dest.region?.nameEn || "Region"}
                      </span>
                      {dest.rating && (
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          {dest.rating}
                          {dest.reviewCount && <span className="opacity-60">({dest.reviewCount.toLocaleString()})</span>}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {Math.round(dest.avgDurationMins / 60)}h
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        {"$".repeat(dest.priceLevel)}
                        <span className="text-theme-muted/20">{"$".repeat(4 - dest.priceLevel)}</span>
                      </span>
                    </div>

                    {/* Platform links */}
                    <div className="mt-4 pt-4 border-t border-theme">
                      <p className="text-[10px] text-theme-muted mb-2 uppercase tracking-wider font-semibold">{t("explore.findOn")}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(PLATFORM_META).map(([key, meta]) => {
                          const url = (dest as Record<string, unknown>)[key] as string | null | undefined;
                          if (!url) return (
                            <span key={key} className="platform-link platform-link-disabled" title={`${meta.label} — not available`}>
                              <span>{meta.icon}</span>
                              <span className="hidden sm:inline">{meta.label}</span>
                            </span>
                          );
                          return (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="platform-link platform-link-active hover:scale-105 transition-transform"
                              title={`View on ${meta.label}`}
                            >
                              <span>{meta.icon}</span>
                              <span className="hidden sm:inline">{meta.label}</span>
                              <ExternalLink size={10} />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {sortedDestinations.length === 0 && !isLoading && (
              <div className="text-center py-24">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-theme-surface-alt flex items-center justify-center mb-6">
                  <Search size={32} className="text-theme-muted/40" />
                </div>
                <p className="text-theme font-semibold text-xl">{t("explore.noResults")}</p>
                <p className="text-theme-muted text-sm mt-2">{t("explore.tryDifferent")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

