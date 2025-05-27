import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import AdminBookingItem from "../atoms/AdminBookingItem";
import EmptyState from "../atoms/EmptyState";
const AdminBookingActivity = () => {
  const {
    aToken,
    dashData,
    getDashData,
    isAppoinmentAvailable,
    cancelAppointment,
    getAllAppointments,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
      getAllAppointments();
    }
  }, [aToken, getAllAppointments, getDashData]);

  return (
    <div className="bg-white columns-lg rounded-md shadow">
      <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
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
          {dashData.latestAppointments.map((item) => (
            <AdminBookingItem
              item={item}
              cancelAppointment={cancelAppointment}
              key={item._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookingActivity;
