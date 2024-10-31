import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

// Set the base URL for all axios requests
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true; // Add this line to enable credentials

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: "",
  token: "",
  isLoading: true,

  initialize: () => {
    const token = Cookies.get("token"); // Get token from cookies
    const role = Cookies.get("role"); // Get role from cookies

    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      set({ isAuthenticated: true, token, role, isLoading: false });
    } else {
      set({ isAuthenticated: false, role: "", token: "", isLoading: false });
    }
  },

  setAuth: ({ isAuthenticated, role, token }) => {
    const bearerToken = `Bearer ${token}`; // Prefix the token with 'Bearer '
    set({ isAuthenticated, role, token: bearerToken });

    if (isAuthenticated) {
      Cookies.set("token", bearerToken, { expires: 1 / 24 }); // Set token in cookies with 'Bearer'
      Cookies.set("role", role, { expires: 1 / 24 }); // Set role in cookies
      axios.defaults.headers.common["Authorization"] = bearerToken; // Set Bearer token in headers
    } else {
      Cookies.remove("token"); // Remove token from cookies
      Cookies.remove("role"); // Remove role from cookies
      delete axios.defaults.headers.common["Authorization"];
    }
  },

  logout: () => {
    set({ isAuthenticated: false, role: "", token: "", isLoading: false });
    Cookies.remove("token"); // Ensure token is removed on logout
    Cookies.remove("role"); // Ensure role is removed on logout
    delete axios.defaults.headers.common["Authorization"];
  },
}));
