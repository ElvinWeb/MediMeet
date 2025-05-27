import PropTypes from "prop-types";

const BenefitCard = ({ title, description }) => {
  return (
    <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
      <b>{title}</b>
      <p>{description}</p>
    </div>
  );
};

BenefitCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BenefitCard;
