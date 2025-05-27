import { useNavigate } from "react-router-dom";
import { FILTER_LIST } from "../../constants/filterConstants";
import PropTypes from "prop-types";

const SpecialityFilter = ({ showFilter, speciality }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex-col gap-4 text-sm text-gray-600 mt-14 ${
        showFilter ? "flex" : "hidden sm:flex"
      }`}
    >
      {FILTER_LIST.map(({ id, name }) => (
        <p
          key={id}
          onClick={() =>
            speciality === name
              ? navigate("/doctors")
              : navigate(`/doctors/${name}`)
          }
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
            speciality === name ? "bg-[#E2E5FF] text-black " : ""
          }`}
        >
          {name}
        </p>
      ))}
    </div>
  );
};

SpecialityFilter.propTypes = {
  showFilter: PropTypes.bool.isRequired,
  speciality: PropTypes.string,
};

export default SpecialityFilter;
