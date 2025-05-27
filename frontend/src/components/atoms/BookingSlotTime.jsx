import PropTypes from "prop-types";

const BookingSlotTime = ({ item, onSlotTime, slotTime }) => {
  return (
    <p
      onClick={() => onSlotTime(item.time)}
      className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
        item.time === slotTime
          ? "bg-primary text-white"
          : "text-[#949494] border border-[#B4B4B4]"
      }`}
    >
      {item.time.toLowerCase()}
    </p>
  );
};

BookingSlotTime.propTypes = {
  item: PropTypes.shape({
    time: PropTypes.string.isRequired,
  }).isRequired,
  onSlotTime: PropTypes.func.isRequired,
  slotTime: PropTypes.string.isRequired,
};

export default BookingSlotTime;
