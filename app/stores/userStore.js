import { create } from "zustand";

export const useUserActivityStore = create((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
