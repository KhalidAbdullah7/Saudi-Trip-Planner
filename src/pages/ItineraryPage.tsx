import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Download,
  ExternalLink,
  MapPin,
  Save,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { exportTripGoogleMaps, fetchTrip, saveTrip } from "../lib/api";
import { useTripStore } from "../stores/tripStore";
import { DayCard } from "../components/itinerary/DayCard";
import { CostBreakdownPanel } from "../components/budget/CostBreakdownPanel";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export function ItineraryPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const { t, i18n } = useTranslation();
  const { currentTrip } = useTripStore();
  const isAr = i18n.language === "ar";
  const [shareLink, setShareLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showCost, setShowCost] = useState(true);

  const { data: trip, isLoading } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => fetchTrip(tripId!),
    enabled: !!tripId,
    initialData: currentTrip?.id === tripId ? currentTrip : undefined,
  });

  const saveMutation = useMutation({
    mutationFn: () => saveTrip(tripId!),
    onSuccess: (saved) => {
      const link = `${window.location.origin}/itinerary/${tripId}?share=${saved.shareToken}`;
      setShareLink(link);
      navigator.clipboard?.writeText(link).catch(() => undefined);
    },
  });

  const exportMutation = useMutation({
    mutationFn: () => exportTripGoogleMaps(tripId!),
    onSuccess: ({ url }) => window.open(url, "_blank", "noopener,noreferrer"),
  });

  const copyLink = () => {
    navigator.clipboard?.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const stats = useMemo(() => {
    if (!trip) return { days: 0, stops: 0, regions: 0 };
    const uniqueRegions = new Set(trip.itineraryDays.map((d) => d.regionSlug));
    return {
      days: trip.itineraryDays.length,
      stops: trip.itineraryDays.reduce((acc, day) => acc + day.items.length, 0),
      regions: uniqueRegions.size,
    };
  }, [trip]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32 page-enter">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-theme-surface-alt" />
            <div className="absolute inset-0 rounded-full border-4 border-theme-primary border-t-transparent animate-spin" />
            <Sparkles size={20} className="absolute inset-0 m-auto text-theme-primary" />
          </div>
          <p className="text-theme-muted font-medium">{t("planner.generating")}</p>
          <p className="text-sm text-theme-muted/60">{t("itinerary.generatingHint")}</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-32 page-enter">
        <MapPin size={48} className="mx-auto text-theme-muted/30 mb-4" />
        <p className="text-theme-muted text-lg">{t("itinerary.notFound")}</p>
        <Link to="/plan" className="text-theme-primary text-sm mt-2 hover:underline inline-block">
          {t("itinerary.planNew")}
        </Link>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* Hero header */}
      <div className="relative bg-gradient-to-br from-theme-primary/10 via-transparent to-theme-accent/10 border-b border-theme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent/10 text-theme-accent text-xs font-medium mb-3">
                <Check size={12} />
                {t("itinerary.ready")}
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-theme">{t("itinerary.title")}</h1>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-theme-muted">
                <span className="flex items-center gap-1.5 bg-theme-surface-alt px-3 py-1 rounded-full">
                  <Calendar size={14} className="text-theme-primary" />
                  {trip.startDate.split("T")[0]}
                </span>
                <span className="text-theme-muted/30">→</span>
                <span className="flex items-center gap-1.5 bg-theme-surface-alt px-3 py-1 rounded-full">
                  <Calendar size={14} className="text-theme-accent" />
                  {trip.endDate.split("T")[0]}
                </span>
                <span className="flex items-center gap-1.5 bg-theme-surface-alt px-3 py-1 rounded-full">
                  <Users size={14} />
                  {trip.partySize} {t("itinerary.travelers")}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              {[
                { label: t("itinerary.statDays"), value: stats.days, color: "text-theme-primary" },
                { label: t("itinerary.statStops"), value: stats.stops, color: "text-theme-accent" },
                { label: t("itinerary.statRegions"), value: stats.regions, color: "text-amber-500" },
              ].map((s) => (
                <div key={s.label} className="text-center bg-theme-surface rounded-2xl border border-theme px-5 py-3">
                  <p className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-theme-muted uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => saveMutation.mutate()} isLoading={saveMutation.isPending} variant="outline" size="sm">
              <Save size={14} /> {t("itinerary.save")}
            </Button>
            <Button onClick={() => exportMutation.mutate()} isLoading={exportMutation.isPending} size="sm">
              <ExternalLink size={14} /> {t("itinerary.exportGMaps")}
            </Button>
            {shareLink && (
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-theme-accent bg-theme-accent/5 text-theme-accent text-sm font-medium hover:bg-theme-accent/10 transition-all"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t("itinerary.copied") : t("itinerary.shareReady")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 stagger-children">
            {trip.itineraryDays.map((day) => (
              <DayCard key={day.id} day={day} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Toggle button for mobile */}
              <button
                onClick={() => setShowCost(!showCost)}
                className="lg:hidden w-full flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme text-sm font-medium text-theme"
              >
                {t("budget.title")}
                {showCost ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <div className={showCost ? "block" : "hidden lg:block"}>
                {trip.costBreakdown && (
                  <CostBreakdownPanel tripId={trip.id} breakdown={trip.costBreakdown} partySize={trip.partySize} />
                )}
              </div>

              {/* Quick map overview card */}
              <div className="bg-theme-surface rounded-2xl border border-theme p-5">
                <h3 className="font-display font-bold text-sm text-theme mb-3 flex items-center gap-2">
                  <MapPin size={14} className="text-theme-primary" />
                  {t("itinerary.quickMap")}
                </h3>
                <div className="space-y-2">
                  {trip.itineraryDays.map((day) => (
                    <div key={day.id} className="flex items-center gap-3 text-xs">
                      <span className="w-6 h-6 rounded-lg bg-theme-primary/10 text-theme-primary font-bold flex items-center justify-center">
                        {day.dayNumber}
                      </span>
                      <span className="text-theme-muted truncate">
                        {isAr ? t(`regions.${day.regionSlug}`) : day.regionSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                      <Badge className="ml-auto text-[9px]">{day.items.length} stops</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

