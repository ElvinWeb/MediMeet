import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import DegreeBadge from "../atoms/DegreeBadge";
import AvailableStatus from "../atoms/AvailableStatus";

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
        <DegreeBadge degree={doctor.degree} />
      </div>

      <div className="p-4">
        <AvailableStatus available={doctor.available} />

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
