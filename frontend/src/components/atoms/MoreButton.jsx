import { useNavigate } from "react-router-dom";

const MoreButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Expand more"
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

export default MoreButton;
