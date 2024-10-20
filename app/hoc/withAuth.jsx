import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

const withAuth = (Component, requiredRole) => {
  return function AuthWrapped(props) {
    const { isAuthenticated, role, isLoading, initialize } = useAuthStore(
      (state) => ({
        isAuthenticated: state.isAuthenticated,
        role: state.role,
        isLoading: state.isLoading,
        initialize: state.initialize,
      })
    );
    const router = useRouter();

    useEffect(() => {
      initialize(); // Initialize auth state

      // Redirect logic
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push("/403"); // Not authenticated
        } else if (role !== requiredRole) {
          router.push("/403"); // Role mismatch
        }
      }
    }, [isAuthenticated, role, isLoading, router, requiredRole, initialize]);

    if (isLoading) {
      return <div>Loading...</div>; // Show loading state
    }

    // Render the wrapped component if authenticated and role matches
    return isAuthenticated && role === requiredRole ? (
      <Component {...props} />
    ) : null;
  };
};

export default withAuth;
