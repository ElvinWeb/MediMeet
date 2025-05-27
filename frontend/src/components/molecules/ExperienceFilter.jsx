import PropTypes from "prop-types";
import { EXPERIENCE_FILTER_OPTIONS } from "../../constants/dropdownValues";

const ExperienceFilter = ({ sortValue, onSortChange }) => {
  return (
    <select
      className="rounded border-2 border-gray-300 text-sm px-2 py-2 outline-none"
      value={sortValue}
      onChange={(e) => onSortChange(e.target.value)}
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
};

export default ExperienceFilter;
