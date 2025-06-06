import PropTypes from "prop-types";

const SectionTitle = ({ title, subtitle, headingId }) => {
  return (
    <>
      <h2 id={headingId} className="text-3xl font-medium">
        {title}
      </h2>
      <p className="sm:w-1/3 text-center text-sm">{subtitle}</p>
    </>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  headingId: PropTypes.string,
};

export default SectionTitle;
