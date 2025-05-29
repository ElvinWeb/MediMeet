import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppointmentCardSkeleton from "../components/atoms/AppointmentCardSkeleton";
import EmptyState from "../components/atoms/EmptyState";
import PageTitle from "../components/atoms/PageTitle";
import AppointmentCard from "../components/molecules/AppointmentCard";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";

const MyAppointments = () => {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = useCallback(async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USER.APPOINTMENTS);
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch appointments."
      );
    }
  }, []);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.USER.CANCEL_APPOINTMENT, {
        appointmentId,
      });

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
      const { data } = await api.post(API_ENDPOINTS.USER.STRIPE_PAYMENT, {
        appointmentId,
      });

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
    const fetchData = async () => {
      if (token) {
        setIsLoading(true);
        try {
          await fetchAppointments();
        } catch {
          toast.error("Failed to fetch appointments. Please try again later!");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [setAppointments, token, fetchAppointments]);

  const noAppointments = !appointments || appointments.length === 0;

  return (
    <>
      <PageTitle normalText="MY" boldText="APPOINTMENTS" />
      {isLoading ? (
        <>
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
        </>
      ) : noAppointments ? (
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
