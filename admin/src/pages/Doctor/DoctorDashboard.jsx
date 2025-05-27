import { useContext, useEffect } from "react";
import DoctorBookingActivity from "../../components/molecules/DoctorBookingActivity";
import DoctorStatCards from "../../components/molecules/DoctorStatCards";
import { DoctorContext } from "../../context/DoctorContext";
import AppointmentsStatusPieChart from "../../components/molecules/AppointmentsStatusPieChart";
import DashboardTitle from "../../components/atoms/DashboardTitle";

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
      <DashboardTitle isAdmin={false} profileData={profileData} />

      <DoctorStatCards />

      <section className="flex flex-col lg:flex-row gap-5 mt-10">
        <DoctorBookingActivity />
        <AppointmentsStatusPieChart appointments={dashData.allAppointments} />
      </section>
    </div>
  );
};

export default DoctorDashboard;
