import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const DoctorDetails = ({ docInfo }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0">
        <img
          className="bg-blue-600 w-full sm:max-w-72 rounded-lg"
          src={docInfo.image}
          alt={`Professional photo of Dr. ${docInfo.name}, ${docInfo.speciality} specialist`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
        <header className="mb-4">
          <h1 className="flex items-center gap-2 text-3xl font-medium text-gray-800">
            Dr. {docInfo.name}
            <img
              className="w-5"
              src={assets.verified_icon}
              alt="Verified doctor badge"
            />
          </h1>

          <div className="flex items-center gap-2 mt-1 text-gray-700">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <span
              className="py-0.5 px-2 border border-gray-300 text-xs rounded-full bg-gray-50 text-gray-700"
              aria-label={`${docInfo.experience} years of experience`}
            >
              {docInfo.experience}
            </span>
          </div>
        </header>

        <section aria-labelledby="about-doctor">
          <h2
            id="about-doctor"
            className="flex items-center gap-1 text-sm font-medium text-gray-800 mt-3"
          >
            About
            <img
              className="w-3"
              src={assets.info_icon}
              alt=""
              aria-hidden="true"
            />
          </h2>
          <p className="text-sm text-gray-700 max-w-[700px] mt-1 leading-relaxed">
            {docInfo.about}
          </p>
        </section>

        <div className="mt-4">
          <span className="text-gray-700 font-medium">Appointment fee:</span>
          <span className="text-gray-800 font-semibold ml-1">
            {CURRENCY_SYMBOL}
            {docInfo.fees}
          </span>
        </div>

        {!docInfo.available && (
          <div
            className="mt-3 p-3 border border-red-300 bg-red-50 text-red-700 text-sm rounded"
            role="alert"
            aria-live="polite"
          >
            <strong>Currently unavailable</strong> for booking. Please check
            back later or choose another doctor.
          </div>
        )}

        {/* Availability status for screen readers */}
        <div className="sr-only">
          Doctor availability status:{" "}
          {docInfo.available
            ? "Available for booking"
            : "Currently unavailable"}
        </div>
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
