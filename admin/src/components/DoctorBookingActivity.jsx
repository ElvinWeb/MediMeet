import { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import EmptyState from "../components/EmptyState";
import { DoctorContext } from "../context/DoctorContext";
import { slotDateFormat } from "../utils/dateUtils";

const DoctorBookingActivity = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
    isAppoinmentAvailable,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken, getDashData]);

  return (
    <div className="bg-white">
      <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
        <img
          src={assets.calendar_icon}
          alt="calendar image"
          width={20}
          height={20}
        />
        <p className="font-semibold">Booking Activity</p>
      </div>
      {isAppoinmentAvailable ? (
        <EmptyState
          title="No Appointments Yet"
          subtitle="When appointments are made, they’ll appear here."
        />
      ) : (
        <div className="border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
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
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
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
  );
};

export default DoctorBookingActivity;
