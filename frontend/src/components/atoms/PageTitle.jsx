import PropTypes from "prop-types";

const PageTitle = ({ boldText, normalText, level = 2, className = "" }) => {
  const HeadingTag = `h${level}`;

  return (
    <div className={`text-center text-2xl pt-10 text-gray-600 ${className}`}>
      <HeadingTag>
        {normalText}
        <span className="text-gray-700 font-semibold ml-2">{boldText}</span>
      </HeadingTag>
    </div>
  );
};

PageTitle.propTypes = {
  boldText: PropTypes.string.isRequired,
  normalText: PropTypes.string.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
};

export default PageTitle;
