import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

const withAuth = (Component, requiredRole) => {
  return function AuthWrapped(props) {
    const { isAuthenticated, role, isLoading, fetchUser, setAuth } =
      useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        role: state.role,
        isLoading: state.isLoading,
        fetchUser: state.fetchUser,
        setAuth: state.setAuth,
      }));
    const router = useRouter();

    useEffect(() => {
      // Fetch user if not authenticated
      if (!isAuthenticated) {
        fetchUser();
      }
    }, [isAuthenticated, fetchUser]); // Added fetchUser to dependency array

    useEffect(() => {
      // Redirect if not authenticated or if role doesn't match
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push("/403");
          setAuth({ isLoading: false }); // Set loading to false when redirecting to login
        } else if (role !== requiredRole) {
          router.push("/403");
          setAuth({ isLoading: false }); // Set loading to false when redirecting to 403
        }
      }
    }, [isAuthenticated, role, isLoading, router, requiredRole, setAuth]); // Added setAuth to dependency array

    if (isLoading) {
      return <div>Loading...</div>; // Show loading state
    }

    // Render the wrapped component if authenticated and role matches
    if (isAuthenticated && role === requiredRole) {
      return <Component {...props} />;
    }

    return null; // Optionally render nothing if not authenticated
  };
};

export default withAuth; // Ensure this line is here
