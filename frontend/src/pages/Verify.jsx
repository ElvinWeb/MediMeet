import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to verify stripe payment
  const verifyStripe = useCallback(async () => {
    try {
      const { data } = await axios.post(
        backendUrl + API_ENDPOINTS.USER.STRIPE_VERIFY,
        { success, appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      navigate("/my-appointments");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }, [appointmentId, backendUrl, navigate, success, token]);

  useEffect(() => {
    if ((token, appointmentId, success)) {
      verifyStripe();
    }
  }, [appointmentId, success, token, verifyStripe]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
