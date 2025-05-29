import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        scrollTo(0, 0);
      }}
      className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 relative"
    >
      <img className="bg-[#EAEFFF]" src={doctor.image} alt="" />
      <span className="bg-primary py-1 px-2 rounded-md text-white text-xs absolute top-[10px] right-[10px]">{doctor.degree}</span>
      <div className="p-4">
        <div
          className={`flex items-center gap-2 text-sm text-center ${
            doctor.available ? "text-green-500" : "text-gray-500"
          }`}
        >
          <p
            className={`w-2 h-2 rounded-full ${
              doctor.available ? "bg-green-500" : "bg-gray-500"
            }`}
          ></p>
          <p>{doctor.available ? "Available" : "Not Available"}</p>
        </div>
        <p className="text-[#262626] text-lg font-medium">{doctor.name}</p>
        <p className="text-[#5C5C5C] text-sm">{doctor.speciality}</p>
      </div>
    </div>
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
