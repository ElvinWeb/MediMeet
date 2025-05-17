import { DAYS_OF_WEEK } from "../constants/dateConstants";
import PropTypes from "prop-types";

const BookingSlots = ({
  docSlots,
  onBookAppointment,
  onSlotIndex,
  onSlotTime,
  slotIndex,
  slotTime,
}) => {
  return (
    <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
      <p>Booking slots</p>
      <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
        {docSlots.length &&
          docSlots.map((item, index) => (
            <div
              onClick={() => onSlotIndex(index)}
              key={index}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-primary text-white"
                  : "border border-[#DDDDDD]"
              }`}
            >
              <p>{item[0] && DAYS_OF_WEEK[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
      </div>

      <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
        {docSlots.length &&
          docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => onSlotTime(item.time)}
              key={index}
              className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? "bg-primary text-white"
                  : "text-[#949494] border border-[#B4B4B4]"
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
      </div>

      <button
        onClick={onBookAppointment}
        className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
      >
        Book an appointment
      </button>
    </div>
  );
};

BookingSlots.propTypes = {
  docSlots: PropTypes.array.isRequired,
  onBookAppointment: PropTypes.func.isRequired,
  onSlotIndex: PropTypes.func.isRequired,
  onSlotTime: PropTypes.func.isRequired,
  slotIndex: PropTypes.number.isRequired,
  slotTime: PropTypes.string.isRequired,
};

export default BookingSlots;
