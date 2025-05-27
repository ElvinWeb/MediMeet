import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import AppointmentCard from "../components/molecules/AppointmentCard";
import EmptyState from "../components/atoms/EmptyState";
import { AppContext } from "../context/AppContext";
import { API_ENDPOINTS, BACKEND_URL } from "../constants/apiEndpoints";
import PageTitle from "../components/atoms/PageTitle";

const MyAppointments = () => {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        BACKEND_URL + API_ENDPOINTS.USER.APPOINTMENTS,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch appointments."
      );
    }
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.USER.CANCEL_APPOINTMENT,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Cancellation failed.");
    }
  };

  const handleStripePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.USER.STRIPE_PAYMENT,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message || "Stripe session failed.");
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
    <>
      <PageTitle normalText="MY" boldText="APPOINTMENTS" />
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
            onStripePayment={handleStripePayment}
          />
        ))
      )}
    </>
  );
};

export default MyAppointments;
