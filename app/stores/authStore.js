import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie"; // Make sure to import js-cookie

// Set the base URL for all axios requests
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; // Replace with your Laravel API URL

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: "",
  token: "",
  isLoading: true,

  initialize: () => {
    const token = Cookies.get("token"); // Get token from cookies
    const role = Cookies.get("role"); // Get role from cookies

    if (token) {
      set({ isAuthenticated: true, token, role, isLoading: false });
    } else {
      set({ isAuthenticated: false, role: "", token: "", isLoading: false });
    }
  },

  setAuth: ({ isAuthenticated, role, token }) => {
    set({ isAuthenticated, role, token });
    if (isAuthenticated) {
      Cookies.set("token", token, { expires: 1 }); // Set token in cookies
      Cookies.set("role", role, { expires: 1 }); // Set role in cookies
    } else {
      Cookies.remove("token"); // Remove token from cookies
      Cookies.remove("role"); // Remove role from cookies
    }
  },

  logout: () => {
    set({ isAuthenticated: false, role: "", token: "", isLoading: false });
    Cookies.remove("token"); // Ensure token is removed on logout
    Cookies.remove("role"); // Ensure role is removed on logout
  },
}));
