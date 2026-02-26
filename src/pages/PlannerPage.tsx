import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTrip, fetchRegions } from "../lib/api";
import { useTripStore } from "../stores/tripStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/cn";
import type { TripFormData } from "../types/api";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Coffee,
  Compass,
  Heart,
  Hotel,
  Landmark,
  Mountain,
  ShoppingBag,
  Sparkles,
  Star,
  Utensils,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

const schema = z
  .object({
    startDate: z.string().min(1, "Required"),
    endDate: z.string().min(1, "Required"),
    startingCity: z.string().min(1, "Required"),
    partySize: z.coerce.number().int().min(1).max(20),
    pace: z.enum(["RELAXED", "MODERATE", "PACKED"]),
    interests: z.array(z.string()).min(1, "Select at least one interest"),
    budgetMinSar: z.coerce.number().int().min(0),
    budgetMaxSar: z.coerce.number().int().min(1),
    accommodationTier: z.enum(["BUDGET", "MID_RANGE", "LUXURY"]),
    transportPref: z.enum(["PUBLIC", "RENTAL_CAR", "PRIVATE_DRIVER", "MIX"]),
  })
  .refine((d) => d.budgetMaxSar > d.budgetMinSar, {
    message: "Max budget must exceed min",
    path: ["budgetMaxSar"],
  });

const INTERESTS = [
  { value: "culture", labelKey: "planner.interestCulture", icon: Landmark, emoji: "🕌" },
  { value: "food", labelKey: "planner.interestFood", icon: Utensils, emoji: "🍽️" },
  { value: "coffee", labelKey: "planner.interestCoffee", icon: Coffee, emoji: "☕" },
  { value: "nature", labelKey: "planner.interestNature", icon: Mountain, emoji: "🏔️" },
  { value: "city", labelKey: "planner.interestCity", icon: Compass, emoji: "🏙️" },
  { value: "adventure", labelKey: "planner.interestAdventure", icon: Zap, emoji: "🪂" },
  { value: "shopping", labelKey: "planner.interestShopping", icon: ShoppingBag, emoji: "🛍️" },
  { value: "luxury", labelKey: "planner.interestLuxury", icon: Star, emoji: "💎" },
  { value: "events", labelKey: "planner.interestEvents", icon: Sparkles, emoji: "🎭" },
];

const STEPS = [
  { key: "dates", icon: CalendarDays, color: "from-amber-500 to-orange-500" },
  { key: "travelers", icon: Users, color: "from-blue-500 to-indigo-500" },
  { key: "interests", icon: Heart, color: "from-rose-500 to-pink-500" },
  { key: "budget", icon: Wallet, color: "from-emerald-500 to-teal-500" },
  { key: "preferences", icon: Hotel, color: "from-purple-500 to-violet-500" },
];

export function PlannerPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCurrentTrip } = useTripStore();
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const { data: regions = [] } = useQuery({
    queryKey: ["regions"],
    queryFn: fetchRegions,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TripFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      partySize: 2,
      pace: "MODERATE",
      interests: [],
      budgetMinSar: 3000,
      budgetMaxSar: 15000,
      accommodationTier: "MID_RANGE",
      transportPref: "MIX",
    },
  });

  const mutation = useMutation({
    mutationFn: createTrip,
    onSuccess: (trip) => {
      setCurrentTrip(trip);
      navigate(`/itinerary/${trip.id}`);
    },
  });

  const onSubmit = (data: TripFormData) => mutation.mutate(data);

  const nextStep = async () => {
    const fieldGroups: (keyof TripFormData)[][] = [
      ["startDate", "endDate", "startingCity"],
      ["partySize", "pace"],
      ["interests"],
      ["budgetMinSar", "budgetMaxSar"],
      ["accommodationTier", "transportPref"],
    ];
    const valid = await trigger(fieldGroups[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const watchedInterests = watch("interests");

  /* Scroll to form on step change */
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const currentColor = STEPS[step].color;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="page-enter min-h-screen bg-gradient-subtle">
      {/* Decorative background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 gradient-orb bg-theme-primary/8" />
        <div className="absolute bottom-20 -left-32 w-80 h-80 gradient-orb bg-theme-accent/8" style={{ animationDelay: "-10s" }} />
      </div>

      {/* Header with progress bar */}
      <div className="relative z-10 border-b border-theme bg-theme-bg/80 backdrop-blur-xl">
        {/* Smooth progress bar */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-theme-primary to-theme-accent transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles size={12} className="animate-pulse" />
              {t("planner.badge")}
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-theme">{t("planner.title")}</h1>
            <p className="mt-3 text-theme-muted text-lg max-w-xl mx-auto">{t("planner.subtitle")}</p>
          </div>

          {/* Premium step indicator */}
          <div className="flex items-center justify-center mt-10 gap-0">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <div key={s.key} className="flex items-center">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => i < step && setStep(i)}
                      className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10",
                        isActive && `bg-gradient-to-br ${s.color} text-white shadow-xl scale-110`,
                        isDone && "bg-theme-accent text-white cursor-pointer shadow-md hover:scale-105",
                        !isActive && !isDone && "bg-theme-surface border-2 border-theme text-theme-muted"
                      )}
                    >
                      {isDone ? <Check size={18} strokeWidth={2.5} /> : <Icon size={18} />}
                    </button>
                    {/* Active ring pulse */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.color} opacity-30 animate-ping`} />
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn(
                      "w-8 sm:w-14 h-1 mx-1.5 rounded-full transition-all duration-500",
                      i < step ? "bg-theme-accent" : "bg-theme-surface-alt"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-theme-muted mt-3 font-medium">
            {t(`planner.step${step + 1}Label`)} — {step + 1}/{STEPS.length}
          </p>
        </div>
      </div>

      {/* Form content */}
      <div ref={formRef} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Dates */}
          {step === 0 && (
            <Card className="animate-slide-up border-gradient shine-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentColor} flex items-center justify-center shadow-lg`}>
                  <CalendarDays size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-theme">{t("planner.dates")}</h2>
                  <p className="text-sm text-theme-muted">{t("planner.datesDesc")}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                <Input type="date" label={t("planner.startDate")} id="startDate" error={errors.startDate?.message} {...register("startDate")} />
                <Input type="date" label={t("planner.endDate")} id="endDate" error={errors.endDate?.message} {...register("endDate")} />
                <Select
                  label={t("planner.startingCity")}
                  id="startingCity"
                  options={regions.map((r) => ({ value: r.slug, label: r.nameEn }))}
                  error={errors.startingCity?.message}
                  {...register("startingCity")}
                />
              </div>
            </Card>
          )}

          {/* Step 2: Travelers */}
          {step === 1 && (
            <Card className="animate-slide-up border-gradient shine-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentColor} flex items-center justify-center shadow-lg`}>
                  <Users size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-theme">{t("planner.travelersTitle")}</h2>
                  <p className="text-sm text-theme-muted">{t("planner.travelersDesc")}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input type="number" label={t("planner.partySize")} id="partySize" min={1} max={20} error={errors.partySize?.message} {...register("partySize")} />
                <Select
                  label={t("planner.pace")}
                  id="pace"
                  options={[
                    { value: "RELAXED", label: t("planner.paceRelaxed") },
                    { value: "MODERATE", label: t("planner.paceModerate") },
                    { value: "PACKED", label: t("planner.pacePacked") },
                  ]}
                  error={errors.pace?.message}
                  {...register("pace")}
                />
              </div>
            </Card>
          )}

          {/* Step 3: Interests */}
          {step === 2 && (
            <Card className="animate-slide-up border-gradient shine-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentColor} flex items-center justify-center shadow-lg`}>
                  <Heart size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-theme">{t("planner.interests")}</h2>
                  <p className="text-sm text-theme-muted">{t("planner.interestsDesc")}</p>
                </div>
              </div>
              {errors.interests && <p className="text-sm text-red-500 mb-3">{errors.interests.message}</p>}
              <Controller
                name="interests"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {INTERESTS.map((interest) => {
                      const selected = field.value.includes(interest.value);
                      return (
                        <button
                          key={interest.value}
                          type="button"
                          onClick={() => {
                            const next = selected
                              ? field.value.filter((v) => v !== interest.value)
                              : [...field.value, interest.value];
                            field.onChange(next);
                          }}
                          className={cn(
                            "relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-300 text-center group",
                            selected
                              ? "border-theme-primary bg-theme-primary/5 shadow-lg scale-[1.02]"
                              : "border-theme bg-theme-surface hover:border-theme-primary/40 hover:shadow-md hover:scale-[1.01]"
                          )}
                        >
                          {selected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-theme-primary to-theme-accent flex items-center justify-center shadow-md">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{interest.emoji}</span>
                          <span className={cn(
                            "text-sm font-semibold",
                            selected ? "text-theme-primary" : "text-theme"
                          )}>
                            {t(interest.labelKey)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </Card>
          )}

          {/* Step 4: Budget */}
          {step === 3 && (
            <Card className="animate-slide-up border-gradient shine-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentColor} flex items-center justify-center shadow-lg`}>
                  <Wallet size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-theme">{t("planner.budget")}</h2>
                  <p className="text-sm text-theme-muted">{t("planner.budgetDesc")}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input type="number" label={t("planner.budgetMin")} id="budgetMinSar" min={0} step={500} error={errors.budgetMinSar?.message} {...register("budgetMinSar")} />
                <Input type="number" label={t("planner.budgetMax")} id="budgetMaxSar" min={1} step={500} error={errors.budgetMaxSar?.message} {...register("budgetMaxSar")} />
              </div>
            </Card>
          )}

          {/* Step 5: Preferences */}
          {step === 4 && (
            <Card className="animate-slide-up border-gradient shine-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentColor} flex items-center justify-center shadow-lg`}>
                  <Hotel size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-theme">{t("planner.preferencesTitle")}</h2>
                  <p className="text-sm text-theme-muted">{t("planner.preferencesDesc")}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Select
                  label={t("planner.accommodation")}
                  id="accommodationTier"
                  options={[
                    { value: "BUDGET", label: t("planner.accBudget") },
                    { value: "MID_RANGE", label: t("planner.accMidRange") },
                    { value: "LUXURY", label: t("planner.accLuxury") },
                  ]}
                  {...register("accommodationTier")}
                />
                <Select
                  label={t("planner.transport")}
                  id="transportPref"
                  options={[
                    { value: "PUBLIC", label: t("planner.transPublic") },
                    { value: "RENTAL_CAR", label: t("planner.transRental") },
                    { value: "PRIVATE_DRIVER", label: t("planner.transPrivate") },
                    { value: "MIX", label: t("planner.transMix") },
                  ]}
                  {...register("transportPref")}
                />
              </div>
            </Card>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={step === 0}
              className={cn("transition-all duration-300", step === 0 ? "invisible" : "hover:gap-3")}
            >
              <ArrowLeft size={16} /> {t("planner.back")}
            </Button>

            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={nextStep} className="px-8 gap-2 shadow-lg hover:shadow-xl hover:gap-3 transition-all duration-300">
                {t("planner.next")} <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                isLoading={mutation.isPending}
                className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-10"
              >
                <Sparkles size={16} />
                {mutation.isPending ? t("planner.generating") : t("planner.generate")}
              </Button>
            )}
          </div>

          {mutation.isError && (
            <div className="mt-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-center">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{t("planner.error")}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

