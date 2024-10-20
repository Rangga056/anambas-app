import { create } from "zustand";
import axios from "axios";

// Set the base URL for all axios requests
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; // Replace with your Laravel API URL

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: "",
  token: "",
  isLoading: true,

  initialize: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      set({ isAuthenticated: true, token, role, isLoading: false });
    } else {
      set({ isAuthenticated: false, role: "", token: "", isLoading: false });
    }
  },

  setAuth: ({ isAuthenticated, role, token }) => {
    set({ isAuthenticated, role, token });
    if (isAuthenticated) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  },

  logout: () =>
    set({ isAuthenticated: false, role: "", token: "", isLoading: false }),
}));
