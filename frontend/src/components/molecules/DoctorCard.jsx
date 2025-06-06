import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/appointment/${doctor._id}`);
    scrollTo(0, 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 relative bg-white"
      role="button"
      tabIndex="0"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-labelledby={`doctor-name-${doctor._id}`}
      aria-describedby={`doctor-details-${doctor._id}`}
    >
      <div className="relative">
        <img
          className="w-full h-50 object-cover bg-blue-50"
          src={doctor.image}
          alt={`Professional photo of Dr. ${doctor.name}, ${doctor.speciality} specialist`}
          loading="lazy"
          decoding="async"
        />

        <span
          className="bg-blue-600 py-1 px-2 rounded-md text-white text-xs absolute top-3 right-3 font-medium"
          aria-label={`Qualification: ${doctor.degree}`}
        >
          {doctor.degree}
        </span>
      </div>

      <div className="p-4">
        <div
          className={`flex items-center gap-2 text-sm mb-2 ${
            doctor.available ? "text-green-600" : "text-gray-500"
          }`}
          role="status"
          aria-label={`Availability status: ${
            doctor.available
              ? "Available for appointments"
              : "Currently not available"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              doctor.available ? "bg-green-500" : "bg-gray-400"
            }`}
            aria-hidden="true"
          ></span>
          <span className="font-medium">
            {doctor.available ? "Available" : "Not Available"}
          </span>
        </div>

        <h3
          id={`doctor-name-${doctor._id}`}
          className="text-gray-800 text-lg font-semibold mb-1"
        >
          Dr. {doctor.name}
        </h3>

        <div id={`doctor-details-${doctor._id}`}>
          <p className="text-gray-600 text-sm mb-2">
            {doctor.speciality} Specialist
          </p>
        </div>

        {/* Screen reader only additional context */}
        <span className="sr-only">
          Click to book an appointment with Dr. {doctor.name}
        </span>
      </div>
    </article>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    speciality: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
  }).isRequired,
};

export default DoctorCard;
