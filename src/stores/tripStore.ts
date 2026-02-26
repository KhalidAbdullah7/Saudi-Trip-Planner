import { create } from "zustand";
import type { Trip, TripFormData } from "../types/api";

interface TripState {
  currentTrip: Trip | null;
  formData: Partial<TripFormData>;
  isGenerating: boolean;
  setFormData: (data: Partial<TripFormData>) => void;
  setCurrentTrip: (trip: Trip | null) => void;
  setIsGenerating: (v: boolean) => void;
  reset: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  currentTrip: null,
  formData: {
    partySize: 2,
    pace: "MODERATE",
    interests: [],
    budgetMinSar: 3000,
    budgetMaxSar: 15000,
    accommodationTier: "MID_RANGE",
    transportPref: "MIX",
  },
  isGenerating: false,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  setIsGenerating: (v) => set({ isGenerating: v }),
  reset: () =>
    set({
      currentTrip: null,
      formData: {
        partySize: 2,
        pace: "MODERATE",
        interests: [],
        budgetMinSar: 3000,
        budgetMaxSar: 15000,
        accommodationTier: "MID_RANGE",
        transportPref: "MIX",
      },
      isGenerating: false,
    }),
}));
