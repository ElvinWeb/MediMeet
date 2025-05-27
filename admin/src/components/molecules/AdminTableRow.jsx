import { slotDateFormat } from "../../utils/dateUtils";
import { calculateAge } from "../../utils/ageUtils";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const AdminTableRow = ({ cancelAppointment, item, index }) => {
  return (
    <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
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
      <p>
        {slotDateFormat(item.slotDate)}, {item.slotTime}
      </p>
      <div className="flex items-center gap-2">
        <img
          src={item.docData.image}
          className="w-8 rounded-full bg-gray-200"
          alt=""
        />
        <p>{item.docData.name}</p>
      </div>
      <div>
        {item.payment ? (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
            Paid
          </span>
        ) : (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
            Not Paid
          </span>
        )}
      </div>
      <p>
        {CURRENCY_SYMBOL}
        {item.amount}
      </p>
      {item.cancelled ? (
        <p className="text-red-400 text-xs font-medium">Cancelled</p>
      ) : item.isCompleted ? (
        <p className="text-green-500 text-xs font-medium">Completed</p>
      ) : (
        <img
          onClick={() => cancelAppointment(item._id)}
          className="w-10 cursor-pointer"
          src={assets.cancel_icon}
          alt=""
        />
      )}
    </div>
  );
};

AdminTableRow.propTypes = {
  cancelAppointment: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default AdminTableRow;
