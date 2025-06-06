import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MoreButton = ({ ariaLabel }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        navigate("/doctors");
        scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
    >
      more
    </button>
  );
};

MoreButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
};

export default MoreButton;
