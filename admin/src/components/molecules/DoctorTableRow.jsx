import { slotDateFormat } from "../../utils/dateUtils";
import { calculateAge } from "../../utils/ageUtils";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const DoctorTableRow = ({
  item,
  index,
  cancelAppointment,
  completeAppointment,
}) => {
  return (
    <div className="flex flex-wrap justify-between max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-1 items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50">
      <p className="max-sm:hidden">{index + 1}</p>
      <div className="flex items-center gap-2">
        <img
          src={item.userData.image}
          className="w-8 h-8 rounded-full object-cover"
          alt="Patient"
        />
        <p>{item.userData.name}</p>
      </div>
      <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

      <div>
        {item.payment ? (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full" />
            Paid
          </span>
        ) : (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 me-1 bg-red-500 rounded-full" />
            Not Paid
          </span>
        )}
      </div>

      <p>
        {slotDateFormat(item.slotDate)}, {item.slotTime}
      </p>
      <p>
        {CURRENCY_SYMBOL}
        {item.amount}
      </p>

      {item.cancelled ? (
        <p className="text-red-400 text-xs font-medium">Cancelled</p>
      ) : item.isCompleted ? (
        <p className="text-green-500 text-xs font-medium">Completed</p>
      ) : (
        <div className="flex gap-2">
          <img
            onClick={() => cancelAppointment(item._id)}
            className="w-6 cursor-pointer"
            src={assets.cancel_icon}
            alt="Cancel"
          />
          <img
            onClick={() => completeAppointment(item._id)}
            className="w-6 cursor-pointer"
            src={assets.tick_icon}
            alt="Complete"
          />
        </div>
      )}
    </div>
  );
};

DoctorTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  cancelAppointment: PropTypes.func.isRequired,
  completeAppointment: PropTypes.func.isRequired,
};

export default DoctorTableRow;
