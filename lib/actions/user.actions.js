"use server";

import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; //TODO: Replace with your Laravel API URL in .env.local

export async function Login(data) {
  try {
    const response = await axios.post("/login", data);

    if (response.status === 200) {
      const { token, role } = response.data;
      return { success: true, data: response.data, token, role };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (error) {
    console.error(error);
  }
}
