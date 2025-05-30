import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";

export const useAuthGuard = (requiredRole = null, showMessages = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = dToken || aToken;
      const userRole = aToken ? "admin" : dToken ? "doctor" : null;
      const isAuthorized =
        isAuthenticated && (!requiredRole || userRole === requiredRole);

      if (!isAuthenticated) {
        if (showMessages && location.pathname !== "/login") {
          toast.warn("Please login to access this page");
        }
        setTimeout(
          () => {
            navigate("/login", { state: { from: location }, replace: true });
          },
          showMessages ? 1000 : 0
        );
      } else if (!isAuthorized) {
        if (showMessages) {
          toast.error("Please login to get access for other pages");
        }
        const dashboardPath =
          userRole === "admin" ? "/admin-dashboard" : "/doctor-dashboard";
        setTimeout(
          () => {
            navigate(dashboardPath, { replace: true });
          },
          showMessages ? 1500 : 0
        );
      } else {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [dToken, aToken, requiredRole, location, navigate, showMessages]);

  return {
    isLoading,
    isAuthenticated: dToken || aToken,
    userRole: aToken ? "admin" : dToken ? "doctor" : null,
  };
};
