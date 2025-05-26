import { useContext, useEffect } from "react";
import DoctorBookingActivity from "../../components/DoctorBookingActivity";
import DoctorStatCards from "../../components/DoctorStatCards";
import { DoctorContext } from "../../context/DoctorContext";
import AppointmentsStatusPieChart from "../../components/AppointmentsStatusPieChart";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    profileData,
    getDashData,
    getProfileData,
    getAppointments,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (!dToken) return;

    getProfileData();
    getAppointments();
    getDashData();
  }, [dToken, getAppointments, getDashData, getProfileData]);

  if (!dashData) return null;

  return (
    <div className="m-5">
      <header className="flex flex-col items-start gap-3 mb-5">
        <h1 className="text-4xl font-semibold text-primary">
          Welcome back, Dr. {profileData?.name || ""}
        </h1>
        <p className="text-gray-600 text-lg">
          Here’s a quick overview of today’s activity in MediMeet.
        </p>
      </header>

      <DoctorStatCards />

      <section className="flex flex-col lg:flex-row gap-5 mt-10">
        <DoctorBookingActivity />
        <AppointmentsStatusPieChart appointments={dashData.allAppointments} />
      </section>
    </div>
  );
};

export default DoctorDashboard;
