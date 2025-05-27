import PropTypes from "prop-types";
import BookingSlotDay from "../atoms/BookingSlotDay";
import BookingSlotTime from "../atoms/BookingSlotTime";

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
            <BookingSlotDay
              key={item._id}
              onSlotIndex={onSlotIndex}
              slotIndex={slotIndex}
              index={index}
              item={item}
            />
          ))}
      </div>

      <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
        {docSlots.length &&
          docSlots[slotIndex].map((item) => (
            <BookingSlotTime
              item={item}
              slotTime={slotTime}
              onSlotTime={onSlotTime}
              key={item._id}
            />
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
