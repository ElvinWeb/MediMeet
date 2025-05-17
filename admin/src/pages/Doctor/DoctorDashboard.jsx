import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import EmptyState from "../../components/EmptyState";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { DoctorContext } from "../../context/DoctorContext";
import { slotDateFormat } from "../../utils/dateUtils";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    profileData,
    getDashData,
    getProfileData,
    cancelAppointment,
    completeAppointment,
    isAppoinmentAvailable,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
      getProfileData();
    }
  }, [dToken, getDashData, getProfileData]);

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

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {CURRENCY_SYMBOL} {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          {isAppoinmentAvailable ? (
            <EmptyState
              title="No Appointments Yet"
              subtitle="When appointments are made, they’ll appear here."
            />
          ) : (
            <div className="border border-t-0">
              {dashData.latestAppointments.slice(0, 5).map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item.userData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.userData.name}
                    </p>
                    <p className="text-gray-600 ">
                      Booking on {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className="flex">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt=""
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
