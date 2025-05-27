import PropTypes from "prop-types";

const EmptyState = ({
  title = "No Data Found",
  subtitle = "Please try again later.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm mt-1">{subtitle}</p>
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default EmptyState;
