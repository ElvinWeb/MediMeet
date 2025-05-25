import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { AppContext } from "../context/AppContext";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyStripePayment = useCallback(async () => {
    if (!success || !appointmentId || !token) {
      toast.error("Missing verification data.");
      return navigate("/my-appointments");
    }

    try {
      const response = await axios.post(
        backendUrl + API_ENDPOINTS.USER.STRIPE_VERIFY,
        { success, appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Verification failed.");
    } finally {
      navigate("/my-appointments");
    }
  }, [appointmentId, success, token, backendUrl, navigate]);

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
