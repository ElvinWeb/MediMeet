import PropTypes from "prop-types";

const AvailableStatus = ({ available }) => {
  return (
    <div
      className={`flex items-center gap-2 text-sm mb-2 ${
        available ? "text-green-600" : "text-gray-500"
      }`}
      role="status"
      aria-label={`Availability status: ${
        available ? "Available for appointments" : "Currently not available"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          available ? "bg-green-500" : "bg-gray-400"
        }`}
        aria-hidden="true"
      ></span>
      <span className="font-medium">
        {available ? "Available" : "Not Available"}
      </span>
    </div>
  );
};

AvailableStatus.propTypes = {
  available: PropTypes.bool.isRequired,
};

export default AvailableStatus;
