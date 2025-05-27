import PropTypes from "prop-types";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-3xl font-medium">{title}</h1>
      <p className="sm:w-1/3 text-center text-sm">{subtitle}</p>
    </>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionTitle;
