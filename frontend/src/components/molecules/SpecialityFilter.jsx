import { useNavigate } from "react-router-dom";
import { FILTER_LIST } from "../../constants/filterConstants";
import PropTypes from "prop-types";

const SpecialityFilter = ({ showFilter, speciality }) => {
  const navigate = useNavigate();

  const handleSpecialityClick = (name) => {
    if (speciality === name) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${name}`);
    }
  };

  const handleKeyDown = (event, name) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSpecialityClick(name);
    }
  };

  return (
    <div
      className={`flex-col gap-4 text-sm text-gray-600 mt-14 ${
        showFilter ? "flex" : "hidden sm:flex"
      }`}
    >
      <nav aria-label="Filter by medical specialty">
        <ul className="space-y-2" role="list">
          {FILTER_LIST.map(({ id, name }) => {
            const isSelected = speciality === name;

            return (
              <li key={id} role="listitem">
                <button
                  onClick={() => handleSpecialityClick(name)}
                  onKeyDown={(e) => handleKeyDown(e, name)}
                  className={`w-full text-left px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    isSelected
                      ? "bg-blue-50 border-blue-300 text-blue-800 font-medium"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                  type="button"
                  aria-pressed={isSelected}
                  aria-describedby={`specialty-${id}-desc`}
                >
                  <span className="block">{name}</span>
                </button>

                <div id={`specialty-${id}-desc`} className="sr-only">
                  {isSelected
                    ? `Remove ${name} filter and show all doctors`
                    : `Filter to show only ${name} specialists`}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

SpecialityFilter.propTypes = {
  showFilter: PropTypes.bool.isRequired,
  speciality: PropTypes.string,
};

export default SpecialityFilter;
