import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

const withAuth = (Component, requiredRole) => {
  return function AuthWrapped(props) {
    const { isAuthenticated, role, isLoading, fetchUser } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        fetchUser();
      }
    }, [isAuthenticated]);

    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        router.push("/dashboard/login");
      } else if (isAuthenticated && role !== requiredRole && !isLoading) {
        router.push("/403");
      }
    }, [isAuthenticated, role, isLoading]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated && role === requiredRole) {
      return <Component {...props} />;
    }

    return null;
  };
};

export default withAuth; // Ensure this line is here
