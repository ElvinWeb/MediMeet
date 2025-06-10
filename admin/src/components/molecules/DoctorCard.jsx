import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ item, changeAvailability, onDeleteClick }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/doctor-details", {
      state: { doctor: item },
    });
  };

  const handleImageKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleImageClick();
    }
  };

  const handleUpdateClick = () => {
    navigate("/update-doctor", {
      state: { doctor: item },
    });
  };

  const handleAvailabilityChange = () => {
    changeAvailability(item._id);
  };

  return (
    <article
      className="border border-blue-300 rounded-xl max-w-56 overflow-hidden group relative bg-white hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300"
      aria-labelledby={`doctor-name-${item._id}`}
      aria-describedby={`doctor-details-${item._id}`}
    >
      <span
        className="bg-blue-600 py-1 px-2 rounded-md text-white text-xs absolute top-[10px] right-[10px] z-10 font-medium"
        aria-label={`Qualification: ${item.degree}`}
      >
        {item.degree}
      </span>

      <div
        className="cursor-pointer"
        onClick={handleImageClick}
        onKeyDown={handleImageKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`View details for Dr. ${item.name}`}
        aria-describedby={`view-details-help-${item._id}`}
      >
        <img
          className="w-full h-auto"
          src={item.image}
          alt={`Professional photo of Dr. ${item.name}, ${item.speciality} specialist`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-4">
        <header>
          <h3
            id={`doctor-name-${item._id}`}
            className="text-gray-800 text-lg font-medium mb-1"
          >
            Dr. {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{item.speciality}</p>
        </header>

        <div id={`doctor-details-${item._id}`} className="my-3">
          <div className="flex items-center gap-2 text-sm">
            <label
              htmlFor={`availability-${item._id}`}
              className="flex items-center gap-2 cursor-pointer text-gray-700"
            >
              <input
                id={`availability-${item._id}`}
                onChange={handleAvailabilityChange}
                type="checkbox"
                checked={item.available}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                aria-describedby={`availability-help-${item._id}`}
              />
              <span>Available</span>
            </label>
          </div>
        </div>

        <div
          className="flex flex-col gap-2 mt-4"
          role="group"
          aria-label={`Actions for Dr. ${item.name}`}
        >
          <button
            type="button"
            onClick={onDeleteClick}
            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 transition-colors duration-200"
            aria-describedby={`delete-help-${item._id}`}
          >
            Delete Doctor
          </button>

          <button
            type="button"
            onClick={handleUpdateClick}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 transition-colors duration-200"
            aria-describedby={`update-help-${item._id}`}
          >
            Update Info
          </button>
        </div>

        <div className="sr-only">
          <p id={`view-details-help-${item._id}`}>
            Click or press Enter to view detailed information about Dr.{" "}
            {item.name}
          </p>
          <p id={`delete-help-${item._id}`}>
            Remove Dr. {item.name} from the system. This action requires
            confirmation.
          </p>
          <p id={`update-help-${item._id}`}>
            Edit Dr. {item.name} profile information and settings
          </p>
        </div>

        <div className="sr-only">
          Dr. {item.name} is currently{" "}
          {item.available ? "available" : "unavailable"} for appointments.
          Specialization: {item.speciality}. Qualification: {item.degree}.
        </div>
      </div>
    </article>
  );
};

DoctorCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    speciality: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    degree: PropTypes.string.isRequired,
  }).isRequired,
  changeAvailability: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default DoctorCard;
