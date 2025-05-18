import { useContext, useEffect } from "react";
import DoctorBookingActivity from "../../components/DoctorBookingActivity";
import DoctorStatCards from "../../components/DoctorStatCards";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const { dToken, dashData, profileData, getDashData, getProfileData } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getProfileData();
      getDashData();
    }
  }, [dToken, getDashData, getProfileData]);

  console.log("dashData", dashData);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-col items-start gap-3 mb-5">
          <h1 className="text-4xl font-semibold text-primary">
            Welcome back, Dr.{profileData.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            Here’s a quick overview of today’s activity in MediMeet.
          </p>
        </div>

        <DoctorStatCards />
        <DoctorBookingActivity />
      </div>
    )
  );
};

export default DoctorDashboard;
