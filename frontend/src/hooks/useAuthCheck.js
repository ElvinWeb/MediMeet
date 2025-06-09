import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const useAuthCheck = (tokenKey = "token", redirectPath = "/login") => {
  const navigate = useNavigate();

  const validateToken = useCallback((token) => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime + 300) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  }, []);

  const clearAuthAndRedirect = useCallback(
    (message = "Session expired. Please log in again.") => {
      sessionStorage.removeItem(tokenKey);

      if (window.location.pathname !== redirectPath) {
        toast.warn(message);
        navigate(redirectPath, { replace: true });
      }
    },
    [navigate, tokenKey, redirectPath]
  );

  useEffect(() => {
    const token = sessionStorage.getItem(tokenKey);

    if (token && !validateToken(token)) {
      clearAuthAndRedirect();
    }

    const intervalId = setInterval(() => {
      const currentToken = sessionStorage.getItem(tokenKey);
      if (currentToken && !validateToken(currentToken)) {
        clearAuthAndRedirect();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [tokenKey, validateToken, clearAuthAndRedirect]);

  return { validateToken, clearAuthAndRedirect };
};
