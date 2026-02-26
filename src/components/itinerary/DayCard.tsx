import { useTranslation } from "react-i18next";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Clock, MapPin, ExternalLink, Info } from "lucide-react";
import type { ItineraryDay } from "../../types/api";

interface DayCardProps {
  day: ItineraryDay;
}

export function DayCard({ day }: DayCardProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <Card className="animate-slide-up" style={{ animationDelay: `${day.dayNumber * 80}ms` }}>
      {/* Day header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-theme-primary flex items-center justify-center text-white font-bold text-sm">
            {day.dayNumber}
          </div>
          <div>
            <h3 className="font-display font-bold text-theme">
              {t("itinerary.day")} {day.dayNumber}
            </h3>
            <p className="text-xs text-theme-muted">
              {new Date(day.date).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <Badge variant="primary">
          {isAr ? t(`regions.${day.regionSlug}`) : day.regionSlug.replace("-", " ")}
        </Badge>
      </div>

      {/* Items timeline */}
      {day.items.length === 0 ? (
        <p className="text-theme-muted text-sm italic">{t("itinerary.noItems")}</p>
      ) : (
        <div className="space-y-4">
          {day.items.map((item, idx) => (
            <div
              key={item.id}
              className="relative flex gap-4 group"
            >
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-theme-accent border-2 border-theme-surface mt-1.5" />
                {idx < day.items.length - 1 && (
                  <div className="w-0.5 flex-1 bg-theme-accent/20 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-theme text-sm">
                      {isAr ? item.titleAr : item.titleEn}
                    </h4>
                    {item.startTime && (
                      <span className="flex items-center gap-1 text-xs text-theme-muted mt-0.5">
                        <Clock size={10} />
                        {item.startTime} â€” {item.endTime}
                      </span>
                    )}
                  </div>
                  {item.estimatedCostSar > 0 && (
                    <span className="text-xs font-medium text-theme-primary whitespace-nowrap">
                      {item.estimatedCostSar} SAR
                    </span>
                  )}
                </div>

                {/* Why it fits */}
                {(item.noteEn || item.noteAr) && (
                  <p className="text-xs text-theme-muted mt-1.5 flex items-start gap-1">
                    <Info size={12} className="mt-0.5 shrink-0" />
                    {isAr ? item.noteAr : item.noteEn}
                  </p>
                )}

                {/* Action links */}
                <div className="flex gap-3 mt-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px]">
                    {item.category}
                  </Badge>
                  <a
                    href={item.destination?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(isAr ? item.titleAr : item.titleEn)}+Saudi+Arabia`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-theme-primary flex items-center gap-0.5 hover:underline"
                  >
                    <MapPin size={10} /> {t("itinerary.mapLink")}
                  </a>
                  {item.destination?.tripAdvisorUrl && (
                    <a
                      href={item.destination.tripAdvisorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-theme-primary flex items-center gap-0.5 hover:underline"
                    >
                      <ExternalLink size={10} /> TripAdvisor
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

