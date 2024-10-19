import { create } from "zustand";
import axios from "axios";

// Set the base URL for all axios requests
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; //TODO: Replace with your Laravel API URL in .env.local

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: "",
  token: "", // Add token to state
  isLoading: true,
  setAuth: ({ isAuthenticated, role, token }) =>
    set({ isAuthenticated, role, token }),
  logout: () =>
    set({ isAuthenticated: false, role: "", token: "", isLoading: false }),

  fetchUser: async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      set({ isAuthenticated: false, role: "", token: "", isLoading: false });
      return;
    }

    try {
      const res = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      if (res.status === 200) {
        const data = res.data;

        set({
          isAuthenticated: true,
          role: data.role,
          token,
          isLoading: false,
        });
      } else {
        set({ isAuthenticated: false, role: "", token: "", isLoading: false });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      set({ isAuthenticated: false, role: "", token: "", isLoading: false });
    }
  },
}));
