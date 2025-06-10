import PropTypes from "prop-types";
import { EXPERIENCE_FILTER_OPTIONS } from "../../constants/dropdownValues";

const ExperienceFilter = ({
  sortValue,
  onSortChange,
  id = "experience-filter",
}) => {
  return (
    <select
       id={id}
        className="rounded-lg border-2 border-gray-300 text-sm px-3 py-2 bg-white focus:outline-none hover:border-gray-400 transition-colors min-w-[160px]"
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        aria-describedby={`${id}-help`}
    >
      {EXPERIENCE_FILTER_OPTIONS.map(({ id, value, label }) => (
        <option value={value} key={id}>
          {label}
        </option>
      ))}
    </select>
  );
};

ExperienceFilter.propTypes = {
  sortValue: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default ExperienceFilter;
