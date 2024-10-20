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
      let isMounted = true; // Track if the component is mounted

      const handleAuthCheck = () => {
        // Only fetch user if not authenticated
        if (!isAuthenticated) {
          setAuth({ isLoading: true }); // Start loading state
          fetchUser(); // Fetch user data
          if (isMounted) {
            setAuth({ isLoading: false }); // Stop loading state after fetching
          }
        }

        // After fetching, check the current authentication state and role
        if (isMounted) {
          if (!isAuthenticated) {
            console.log("Redirecting to /403: Not Authenticated");
            router.push("/403");
          } else if (role !== requiredRole) {
            console.log(
              `Redirecting to /403: Role mismatch. Expected: ${requiredRole}, but got: ${role}`
            );
            router.push("/403");
          }
        }
      };

      handleAuthCheck(); // Call the authentication check

      return () => {
        isMounted = false; // Cleanup function to mark the component as unmounted
      };
    }, [
      isAuthenticated,
      role,
      isLoading,
      fetchUser,
      router,
      requiredRole,
      setAuth,
    ]);

    if (isLoading) {
      return <div>Loading...</div>; // Show loading state
    }

    // Render the wrapped component if authenticated and role matches
    if (isAuthenticated && role === requiredRole) {
      return <Component {...props} />;
    }

    return null; // Optionally render nothing if not authenticated or role doesn't match
  };
};

export default withAuth;
