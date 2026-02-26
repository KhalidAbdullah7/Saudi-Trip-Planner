import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCostItem } from "../../lib/api";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Pencil, Check, X, Wallet, TrendingUp } from "lucide-react";
import type { CostBreakdown } from "../../types/api";

interface Props {
  tripId: string;
  breakdown: CostBreakdown;
  partySize: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  LODGING: "bg-blue-500",
  TRANSPORT: "bg-yellow-500",
  FOOD: "bg-orange-500",
  COFFEE: "bg-amber-700",
  TICKETS: "bg-purple-500",
  EXPERIENCES: "bg-pink-500",
  SHOPPING: "bg-emerald-500",
  MISC: "bg-gray-400",
};

export function CostBreakdownPanel({ tripId, breakdown, partySize }: Props) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState(0);

  const mutation = useMutation({
    mutationFn: ({ costItemId, amount }: { costItemId: string; amount: number }) =>
      updateCostItem(tripId, costItemId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
      setEditingId(null);
    },
  });

  // Aggregate by category for the summary bar
  const categoryTotals = breakdown.items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amountSar;
    return acc;
  }, {});

  const formatSar = (amount: number) =>
    new Intl.NumberFormat(isAr ? "ar-SA" : "en-SA", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Card>
      <h2 className="font-display font-bold text-xl text-theme mb-4 flex items-center gap-2">
        <Wallet size={20} className="text-theme-primary" />
        {t("budget.title")}
      </h2>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-theme-surface-alt rounded-xl p-4 text-center">
          <p className="text-xs text-theme-muted">{t("budget.total")}</p>
          <p className="font-display font-bold text-xl text-theme-primary">
            {formatSar(breakdown.totalSar)}
          </p>
          <p className="text-[10px] text-theme-muted">SAR</p>
        </div>
        <div className="bg-theme-surface-alt rounded-xl p-4 text-center">
          <p className="text-xs text-theme-muted">{t("budget.perPerson")}</p>
          <p className="font-display font-bold text-xl text-theme-accent">
            {formatSar(breakdown.perPersonSar)}
          </p>
          <p className="text-[10px] text-theme-muted">SAR / {partySize} pax</p>
        </div>
      </div>

      {/* Category bar */}
      <div className="flex rounded-full overflow-hidden h-3 mb-6" role="img" aria-label="Cost distribution">
        {Object.entries(categoryTotals).map(([cat, amount]) => (
          <div
            key={cat}
            className={`${CATEGORY_COLORS[cat] || "bg-gray-300"} transition-all`}
            style={{ width: `${(amount / breakdown.totalSar) * 100}%` }}
            title={`${cat}: ${formatSar(amount)} SAR`}
          />
        ))}
      </div>

      {/* Line items */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {breakdown.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 py-2 px-2 rounded-lg hover:bg-theme-surface-alt transition-colors group"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  CATEGORY_COLORS[item.category] || "bg-gray-300"
                }`}
              />
              <span className="text-xs text-theme truncate">
                {isAr ? item.labelAr : item.labelEn}
              </span>
            </div>

            {editingId === item.id ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(Number(e.target.value))}
                  className="w-20 text-xs px-2 py-1 rounded border border-theme bg-theme-surface text-theme"
                  min={0}
                  autoFocus
                />
                <button
                  onClick={() =>
                    mutation.mutate({ costItemId: item.id, amount: editValue })
                  }
                  className="p-1 text-green-500 hover:bg-green-50 rounded"
                  aria-label="Save"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                  aria-label="Cancel"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-theme whitespace-nowrap">
                  {formatSar(item.amountSar)}
                </span>
                {item.isEditable && (
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setEditValue(item.amountSar);
                    }}
                    className="p-1 opacity-0 group-hover:opacity-100 text-theme-muted hover:text-theme-primary transition-opacity"
                    aria-label={t("budget.edit")}
                  >
                    <Pencil size={12} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Assumptions */}
      {breakdown.assumptions && Object.keys(breakdown.assumptions).length > 0 && (
        <div className="mt-6 pt-4 border-t border-theme">
          <h3 className="text-xs font-semibold text-theme-muted flex items-center gap-1 mb-2">
            <TrendingUp size={12} />
            {t("budget.assumptions")}
          </h3>
          <ul className="space-y-1">
            {Object.entries(breakdown.assumptions).map(([key, val]) => (
              <li key={key} className="text-[10px] text-theme-muted">
                <span className="font-medium capitalize">{key}:</span> {val}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
