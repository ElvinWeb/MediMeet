import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyStripePayment = useCallback(async () => {
    if (!success || !appointmentId || !token) {
      toast.error("Missing verification data.");
      return navigate("/my-appointments");
    }

    try {
      const { data } = await api.post(API_ENDPOINTS.USER.STRIPE_VERIFY, {
        success,
        appointmentId,
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Verification failed.");
    } finally {
      navigate("/my-appointments");
    }
  }, [appointmentId, success, token, navigate]);

  useEffect(() => {
    if (token) {
      verifyStripePayment();
    }
  }, [verifyStripePayment, token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
