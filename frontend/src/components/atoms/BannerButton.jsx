import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BannerButton = ({ path, content, ariaLabel }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        navigate(path);
        scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="bg-white flex items-center gap-2 text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all "
    >
      {content}
    </button>
  );
};

BannerButton.propTypes = {
  path: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
};

export default BannerButton;
