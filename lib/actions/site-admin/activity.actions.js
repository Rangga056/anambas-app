import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL; // Replace with your Laravel API URL
axios.defaults.withCredentials = true; // Add this line to enable credentials

// Server action to fetch user activity data
export const fetchUserActivity = async () => {
  try {
    const response = await axios.get("/useractivity");

    // Transform the data to only include relevant fields
    const transformedData = response.data.data.map((activity) => ({
      username: activity.username,
      action: activity.action,
      date: new Date(activity.created_at).toLocaleString(), // Format the date as needed
    }));

    return transformedData; // Return the transformed data
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw new Error("Failed to fetch user activity");
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get("/user");
    const transformedData = response.data.data.map((user) => ({
      username: user.username,
      email: user.email,
      role: user.role,
      date: new Date(user.updated_at).toLocaleString(), // Format the date as needed
    }));

    return transformedData;
  } catch (error) {
    console.error("An error has occured", error);
    throw new Error("Failed to fetch Users", error);
  }
};
