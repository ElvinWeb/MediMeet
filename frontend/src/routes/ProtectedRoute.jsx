import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import PropTypes from "prop-types";

const ProtectedRoute = ({
  redirectTo = "/login",
  requireAuth = true,
  showToast = true,
  fallback = null,
}) => {
  const location = useLocation();
  const { token } = useContext(AppContext);
  const { validateToken } = useAuthCheck("token", redirectTo);
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const isValid = validateToken(token);
        setIsAuthenticated(isValid);

        if (!isValid && showToast) {
          toast.warn("Your session has expired. Please log in again.");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    checkAuth();
  }, [token, validateToken, showToast]);

  if (isValidating) {
    return fallback || <LoadingSpinner />;
  }

  if (requireAuth && !isAuthenticated) {
    if (showToast && location.pathname !== redirectTo) {
      toast.warn("Please login to get access for other pages");
    }
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
  requireAuth: PropTypes.bool,
  showToast: PropTypes.bool,
  fallback: PropTypes.node,
};

export default ProtectedRoute;
