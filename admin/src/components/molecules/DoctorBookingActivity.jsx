import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";
import DoctorBookingItem from "../atoms/DoctorBookingItem";
import EmptyState from "../atoms/EmptyState";
import MiniLoadingSpinner from "../atoms/MiniLoadingSpinner";
import PropTypes from "prop-types";

const DoctorBookingActivity = ({ isLoading }) => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
    isAppoinmentAvailable,
    getAppointments,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
      getAppointments();
    }
  }, [dToken, getAppointments, getDashData]);

  return (
    <div className="bg-white shadow columns-xl rounded-md">
      <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
        <img
          src={assets.calendar_icon}
          alt="calendar image"
          width={20}
          height={20}
        />
        <p className="font-semibold">Booking Activity</p>
      </div>
      {isLoading ? (
        <MiniLoadingSpinner />
      ) : isAppoinmentAvailable ? (
        <EmptyState
          title="No Appointments Yet"
          subtitle="When appointments are made, they’ll appear here."
        />
      ) : (
        <div className="border border-t-0">
          {dashData.latestAppointments.map((item) => (
            <DoctorBookingItem
              cancelAppointment={cancelAppointment}
              completeAppointment={completeAppointment}
              item={item}
              key={item._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

DoctorBookingActivity.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default DoctorBookingActivity;
