import PropTypes from "prop-types";

const DegreeBadge = ({ degree }) => {
  return (
    <span
      className="bg-blue-600 py-1 px-2 rounded-md text-white text-xs absolute top-3 right-3 font-medium"
      aria-label={`Qualification: ${degree}`}
    >
      {degree}
    </span>
  );
};

DegreeBadge.propTypes = {
  degree: PropTypes.bool.isRequired,
};

export default DegreeBadge;
