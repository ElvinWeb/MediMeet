import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MoreButton = ({ ariaLabel, onLoadMore }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onLoadMore) {
      onLoadMore();
    } else {
      navigate("/doctors");
      scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
    >
      more
    </button>
  );
};

MoreButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func,
};

export default MoreButton;
