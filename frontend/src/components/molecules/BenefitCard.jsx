import PropTypes from "prop-types";

const BenefitCard = ({ title, description, index }) => {
  return (
    <article
      className="border border-gray-200 px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-4 text-base hover:bg-primary hover:text-white transition-all duration-300 text-gray-700 bg-white"
      role="article"
      aria-labelledby={`benefit-title-${index}`}
      aria-describedby={`benefit-desc-${index}`}
      tabIndex="0"
    >
      <h3
        id={`benefit-title-${index}`}
        className="font-bold text-lg"
      >
        {title}
      </h3>
      <p id={`benefit-desc-${index}`} className="leading-relaxed">
        {description}
      </p>
    </article>
  );
};

BenefitCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default BenefitCard;
