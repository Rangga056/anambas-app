import { create } from "zustand";

export const useUserActivityStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export const useUsersStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
