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
  const hasSelectedSlot = slotTime && slotIndex !== null;

  return (
    <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Select Appointment Time
      </h2>

      <fieldset className="mb-6">
        <legend className="text-base font-medium text-gray-800 mb-3">
          Choose Date
        </legend>
        <div
          className="flex gap-3 items-center w-full overflow-x-scroll pb-2"
          role="radiogroup"
          aria-label="Available appointment dates"
        >
          {docSlots.length &&
            docSlots.map((item, index) => (
              <BookingSlotDay
                key={item._id || index}
                onSlotIndex={onSlotIndex}
                slotIndex={slotIndex}
                index={index}
                item={item}
              />
            ))}
        </div>
      </fieldset>

      {slotIndex !== null && docSlots[slotIndex] && (
        <fieldset className="mb-6">
          <legend className="text-base font-medium text-gray-800 mb-3">
            Choose Time
          </legend>
          <div
            className="flex items-center gap-3 w-full overflow-x-scroll pb-2"
            role="radiogroup"
            aria-label="Available appointment times"
          >
            {docSlots[slotIndex].map((item, timeIndex) => (
              <BookingSlotTime
                item={item}
                slotTime={slotTime}
                onSlotTime={onSlotTime}
                key={item._id || timeIndex}
              />
            ))}
          </div>
        </fieldset>
      )}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {hasSelectedSlot && `Selected appointment time: ${slotTime}`}
        {slotIndex !== null && !slotTime && "Please select a time slot"}
      </div>

      <button
        type="button"
        onClick={onBookAppointment}
        disabled={!hasSelectedSlot}
        className={`text-white text-sm font-medium px-20 py-3 rounded-full my-6 transition-all focus:outline-none ${
          hasSelectedSlot
            ? "bg-primary cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        aria-describedby="booking-help"
      >
        {hasSelectedSlot ? "Book Appointment" : "Select Date & Time"}
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
