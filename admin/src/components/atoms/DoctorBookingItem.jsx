import { slotDateFormat } from "../../utils/dateUtils";
import { assets } from "../../assets/assets";

const DoctorBookingItem = ({
  cancelAppointment,
  completeAppointment,
  item,
}) => {
  return (
    <div
      className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
    >
      <img className="rounded-full w-10" src={item.userData.image} alt="" />
      <div className="flex-1 text-sm">
        <p className="text-gray-800 font-medium">{item.userData.name}</p>
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
  );
};

import PropTypes from "prop-types";

DoctorBookingItem.propTypes = {
  cancelAppointment: PropTypes.func.isRequired,
  completeAppointment: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default DoctorBookingItem;
