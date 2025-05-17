import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppointmentCard from "../components/AppointmentCard";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import EmptyState from "../components/EmptyState";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const isAppointmentAvailable =
    !appointments ||
    appointments.length === 0 ||
    appointments.every((appointment) => appointment.cancelled);

  // Getting User Appointments Data Using API
  const getUserAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        backendUrl + API_ENDPOINTS.USER.APPOINTMENTS,
        {
          headers: { token },
        }
      );
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + API_ENDPOINTS.USER.CANCEL_APPOINTMENT,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to pay appointment Using Stripe API
  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + API_ENDPOINTS.USER.STRIPE_PAYMENT,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [getUserAppointments, token]);

  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My appointments
      </p>

      {isAppointmentAvailable ? (
        <EmptyState
          title="No Appointments Yet"
          subtitle="When appointments are made, they’ll appear here."
        />
      ) : (
        appointments
          .filter((appointment) => !appointment.cancelled)
          .map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onCancelAppointment={cancelAppointment}
              onAppointmentStripe={appointmentStripe}
            />
          ))
      )}
    </div>
  );
};

export default MyAppointments;
