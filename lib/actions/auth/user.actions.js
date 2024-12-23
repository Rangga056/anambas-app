"use server";

import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; //TODO: Replace with your Laravel API URL in .env.local

//* Login Function
export async function Login(data) {
  try {
    const response = await axios.post("/login", data);

    if (response.data) {
      const { token, role } = response.data;

      return { success: true, data: response.data, token, role };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (error) {
    // Handle server-side errors and validation errors
    if (error.response) {
      // Return error message from Laravel API
      return {
        success: false,
        error:
          error.response.data.message ||
          "Login failed. Please check your credentials.",
      };
    } else {
      return {
        success: false,
        error: "An error occurred. Please try again later.",
      };
    }
  }
}

//* Register Function
export async function Register(data) {
  try {
    const response = await axios.post("/register", data);

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: "Registration failed. Please try again.",
      };
    }
  } catch (error) {
    console.log(error);
    // Handle server-side errors and validation errors
    if (error.response) {
      // Return error message from Laravel API
      return {
        success: false,
        error:
          error.response.data.message ||
          "Registration failed. Please check your input.",
      };
    } else {
      return {
        success: false,
        error: "An error occurred. Please try again later.",
      };
    }
  }
}
