import PropTypes from "prop-types";

const EmptyState = ({
  title = "No Data Found",
  subtitle = "Please try again later.",
}) => {
  return (
    <section aria-labelledby="empty-state-heading">
      <div
        className="flex flex-col items-center justify-center text-center text-gray-500 py-12 px-4"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>

        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default EmptyState;
