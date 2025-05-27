import PropTypes from "prop-types";

const PageTitle = ({ boldText, normalText }) => {
  return (
    <div className="text-center text-2xl pt-10 text-[#707070]">
      <p>
        {normalText}
        <span className="text-gray-700 font-semibold ml-2">{boldText}</span>
      </p>
    </div>
  );
};

PageTitle.propTypes = {
  boldText: PropTypes.string.isRequired,
  normalText: PropTypes.string.isRequired,
};

export default PageTitle;
