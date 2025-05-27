import { formatDate } from "../../utils/dateUtils";
import PropTypes from "prop-types";

const AdminDoctorItem = ({ item }) => {
  return (
    <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
      <img className="rounded-full w-10" src={item.image} alt="" />
      <div className="flex-1 text-sm">
        <p className="text-gray-800 font-medium">{item.name}</p>
        <p className="text-gray-600 ">
          {item?.type === "added"
            ? `Added on ${formatDate(item.date, true)}`
            : `Updated on ${formatDate(item.date, true)}`}
        </p>
      </div>
    </div>
  );
};

AdminDoctorItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }).isRequired,
};

export default AdminDoctorItem;
