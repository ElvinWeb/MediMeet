import { DAYS_OF_WEEK } from "../../constants/dateConstants";
import PropTypes from "prop-types";

const BookingSlotDay = ({ item, slotIndex, onSlotIndex, index }) => {
  return (
    <div
      onClick={() => onSlotIndex(index)}
      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
        slotIndex === index
          ? "bg-primary text-white"
          : "border border-[#DDDDDD]"
      }`}
    >
      <p>{item[0] && DAYS_OF_WEEK[item[0].datetime.getDay()]}</p>
      <p>{item[0] && item[0].datetime.getDate()}</p>
    </div>
  );
};

BookingSlotDay.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.array.isRequired,
  slotIndex: PropTypes.number.isRequired,
  onSlotIndex: PropTypes.func.isRequired,
};

export default BookingSlotDay;
