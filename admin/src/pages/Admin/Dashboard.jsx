import AdminBookingActivity from "../../components/molecules/AdminBookingActivity";
import AdminDoctorActivity from "../../components/molecules/AdminDoctorActivity";
import AdminStatCards from "../../components/molecules/AdminStatCards";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import AppointmentsStatusPieChart from "../../components/molecules/AppointmentsStatusPieChart";
import DashboardTitle from "../../components/atoms/DashboardTitle";

const Dashboard = () => {
  const { aToken, getDashData, dashData, getAllAppointments, getAllDoctors } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
      getAllAppointments();
      getAllDoctors();
    }
  }, [aToken, getAllAppointments, getAllDoctors, getDashData]);

  return (
    dashData && (
      <div className="m-5">
        <DashboardTitle isAdmin={true} />

        <AdminStatCards />

        <div className="flex flex-row gap-5 mt-10">
          <AdminBookingActivity />
          <AdminDoctorActivity />
          <AppointmentsStatusPieChart appointments={dashData.allAppointments} />
        </div>
      </div>
    )
  );
};

export default Dashboard;
