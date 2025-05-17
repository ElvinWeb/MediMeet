import AdminBookingActivity from "../../components/AdminBookingActivity";
import AdminDoctorActivity from "../../components/AdminDoctorActivity";
import AdminStatCards from "../../components/AdminStatCards";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);
  useEffect(() => {
    if (aToken && !dashData) {
      getDashData();
    }
  }, [aToken, dashData, getDashData]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-col items-start gap-3 mb-5">
          <h1 className="text-4xl font-semibold text-primary">
            Welcome back, Admin!
          </h1>
          <p className="text-gray-600 text-lg">
            Here’s a quick overview of today’s activity in MediMeet.
          </p>
        </div>

        <AdminStatCards />

        <div className="flex flex-row gap-5 mt-10">
          <AdminBookingActivity />
          <AdminDoctorActivity />
        </div>
      </div>
    )
  );
};

export default Dashboard;
