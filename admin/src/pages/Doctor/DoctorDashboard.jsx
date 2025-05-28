import { useContext, useEffect, useMemo, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (dToken) {
        setIsLoading(true);
        try {
          await getProfileData();
          await getAppointments();
          await getDashData();
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [dToken, getAppointments, getProfileData, getDashData]);

  const allAppointments = useMemo(
    () => dashData?.allAppointments || [],
    [dashData]
  );

  if (!dashData) return null;

  return (
    <div className="m-5">
      <DashboardTitle isAdmin={false} profileData={profileData} />

      <DoctorStatCards />

      <section className="flex flex-col lg:flex-row gap-5 mt-10">
        <DoctorBookingActivity isLoading={isLoading} />
        <AppointmentsStatusPieChart
          appointments={allAppointments}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default DoctorDashboard;
