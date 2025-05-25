import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import AppointmentCard from "../components/AppointmentCard";
import EmptyState from "../components/EmptyState";
import { AppContext } from "../context/AppContext";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        backendUrl + API_ENDPOINTS.USER.APPOINTMENTS,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(response.data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch appointments."
      );
    }
  }, [backendUrl, token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + API_ENDPOINTS.USER.CANCEL_APPOINTMENT,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAppointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Cancellation failed.");
    }
  };

  const handleStripePayment = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + API_ENDPOINTS.USER.STRIPE_PAYMENT,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success && response.data.session_url) {
        window.location.replace(response.data.session_url);
      } else {
        toast.error(response.data.message || "Stripe session failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Payment failed.");
    }
  };

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token, fetchAppointments]);

  const noAppointments = !appointments || appointments.length === 0;

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My Appointments
      </p>

      {noAppointments ? (
        <EmptyState
          title="No Appointments Yet"
          subtitle="When appointments are made, they’ll appear here."
        />
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            appointment={appointment}
            onCancelAppointment={cancelAppointment}
            onAppointmentStripe={handleStripePayment}
          />
        ))
      )}
    </div>
  );
};

export default MyAppointments;
