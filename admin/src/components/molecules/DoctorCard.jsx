import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ item, changeAvailability, setShowModal }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group">
      <img
        className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500"
        src={item.image}
        alt=""
        onClick={() =>
          navigate("/doctor-details", {
            state: { doctor: item },
          })
        }
        loading="lazy"
      />
      <div className="p-4">
        <p className="text-[#262626] text-lg font-medium">{item.name}</p>
        <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
        <div className="my-2 flex items-center gap-1 text-sm">
          <input
            onChange={() => changeAvailability(item._id)}
            type="checkbox"
            checked={item.available}
          />
          <p>Available</p>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() =>
            navigate("/update-doctor", {
              state: { doctor: item },
            })
          }
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
        >
          Update
        </button>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    speciality: PropTypes.string,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    available: PropTypes.bool,
  }).isRequired,
  changeAvailability: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default DoctorCard;
