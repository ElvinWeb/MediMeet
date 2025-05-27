import { slotDateFormat } from "../../utils/dateUtils";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const AdminBookingItem = ({ item, cancelAppointment }) => {
  return (
    <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
      <img
        className="rounded-full w-10"
        src={item.docData.image}
        alt="doctor image"
      />
      <div className="flex-1 text-sm">
        <p className="text-gray-800 font-medium">{item.docData.name}</p>
        <p className="text-gray-600 ">
          Booking on {slotDateFormat(item.slotDate)}
        </p>
      </div>
      {item.cancelled ? (
        <p className="text-red-400 text-xs font-medium">Cancelled</p>
      ) : item.isCompleted ? (
        <p className="text-green-500 text-xs font-medium">Completed</p>
      ) : (
        <img
          onClick={() => cancelAppointment(item._id)}
          className="w-10 cursor-pointer"
          src={assets.cancel_icon}
          alt="cancel icon"
        />
      )}
    </div>
  );
};

AdminBookingItem.propTypes = {
  item: PropTypes.object.isRequired,
  cancelAppointment: PropTypes.func.isRequired,
};

export default AdminBookingItem;
