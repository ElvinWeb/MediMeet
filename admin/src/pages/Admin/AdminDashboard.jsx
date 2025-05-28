import AdminBookingActivity from "../../components/molecules/AdminBookingActivity";
import AdminDoctorActivity from "../../components/molecules/AdminDoctorActivity";
import AdminStatCards from "../../components/molecules/AdminStatCards";
import { useContext, useEffect, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import AppointmentsStatusPieChart from "../../components/molecules/AppointmentsStatusPieChart";
import DashboardTitle from "../../components/atoms/DashboardTitle";

const AdminDashboard = () => {
  const { aToken, getDashData, dashData, getAllAppointments, getAllDoctors } =
    useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (aToken) {
      getDashData();
      getAllAppointments();
      getAllDoctors();
    }
  }, [aToken, getAllAppointments, getAllDoctors, getDashData]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (aToken) {
        setIsLoading(true);
        try {
          await getDashData();
          await getAllAppointments();
          await getAllDoctors();
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [getDashData, aToken, getAllAppointments, getAllDoctors]);

  const allAppointments = useMemo(
    () => dashData?.allAppointments || [],
    [dashData]
  );

  if (!dashData) return null;

  return (
    <div className="m-5">
      <DashboardTitle isAdmin={true} />

      <AdminStatCards />

      <div className="flex flex-row gap-5 mt-10">
        <AdminBookingActivity isLoading={isLoading}/>
        <AdminDoctorActivity isLoading={isLoading}/>
        <AppointmentsStatusPieChart appointments={allAppointments} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default AdminDashboard;
