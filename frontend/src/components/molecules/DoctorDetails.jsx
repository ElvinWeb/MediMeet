import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const DoctorDetails = ({ docInfo }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div>
        <img
          className="bg-primary w-full sm:max-w-72 rounded-lg"
          src={docInfo.image}
          alt="Doctor Image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
        <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
          {docInfo.name}
          <img className="w-5" src={assets.verified_icon} alt="" />
        </p>

        <div className="flex items-center gap-2 mt-1 text-gray-600">
          <p>
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <button className="py-0.5 px-2 border text-xs rounded-full">
            {docInfo.experience}
          </button>
        </div>

        <div>
          <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
            About <img className="w-3" src={assets.info_icon} alt="" />
          </p>
          <p className="text-sm text-gray-600 max-w-[700px] mt-1">
            {docInfo.about}
          </p>
        </div>

        <p className="text-gray-600 font-medium mt-4">
          Appointment fee:
          <span className="text-gray-800">
            {CURRENCY_SYMBOL}
            {docInfo.fees}
          </span>
        </p>

        {!docInfo.available && (
          <div className="mt-3 p-3 border border-red-300 bg-red-50 text-red-600 text-sm rounded">
            Currently unavailable for booking. Please check back later or choose
            another doctor.
          </div>
        )}
      </div>
    </div>
  );
};

DoctorDetails.propTypes = {
  docInfo: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    speciality: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    fees: PropTypes.number.isRequired,
  }).isRequired,
};

export default DoctorDetails;
