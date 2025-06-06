import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppointmentCardSkeleton from "../components/atoms/AppointmentCardSkeleton";
import EmptyState from "../components/atoms/EmptyState";
import PageTitle from "../components/atoms/PageTitle";
import AppointmentCard from "../components/molecules/AppointmentCard";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";
import SEOHelmet from "../components/SEO/SEOHelmet";

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
      <SEOHelmet
        title="My Appointments MediMeet"
        description="Manage your medical appointments with MediMeet. View upcoming and past appointments, cancel or reschedule bookings, and track your healthcare history."
        keywords="my appointments, medical appointments, healthcare bookings, appointment management, patient portal"
      />
      <main id="main-content" tabIndex="-1">
        <PageTitle normalText="MY" boldText="APPOINTMENTS" />

        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {isLoading && "Loading your appointments"}
          {!isLoading &&
            appointments.length > 0 &&
            `Found ${appointments.length} appointment${
              appointments.length !== 1 ? "s" : ""
            }`}
        </div>

        {isLoading ? (
          <section aria-labelledby="loading-heading">
            <h2 id="loading-heading" className="sr-only">
              Loading your appointments
            </h2>
            <div>
              <AppointmentCardSkeleton />
              <AppointmentCardSkeleton />
              <AppointmentCardSkeleton />
              <AppointmentCardSkeleton />
            </div>
          </section>
        ) : noAppointments ? (
          <EmptyState
            title="No Appointments Yet"
            subtitle="When you book appointments, they'll appear here for easy management."
          />
        ) : (
          <section aria-labelledby="appointments-heading">
            <h2 id="appointments-heading" className="sr-only">
              Your appointments ({appointments.length} total)
            </h2>

            <ul className="divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <li key={appointment._id} className="py-4">
                  <AppointmentCard
                    appointment={appointment}
                    onCancelAppointment={cancelAppointment}
                    onStripePayment={handleStripePayment}
                    index={index + 1}
                    total={appointments.length}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default MyAppointments;
