import { create } from "zustand";
import axios from "axios";

// Set the base URL for all axios requests
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; //TODO: Replace with your Laravel API URL in .env.local

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: "",
  isLoading: true,
  setAuth: (auth) => set(auth),
  logout: () => set({ isAuthenticated: false, role: "", isLoading: false }),

  fetchUser: async () => {
    try {
      const res = await axios.get("/auth"); // Example API endpoint to get user data

      if (res.status === 200) {
        const data = res.data;

        set({
          isAuthenticated: true,
          role: data.role,
          isLoading: false,
        });
      } else {
        set({ isAuthenticated: false, role: "", isLoading: false });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      set({ isAuthenticated: false, role: "", isLoading: false });
    }
  },
}));
