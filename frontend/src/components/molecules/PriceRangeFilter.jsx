import PropTypes from "prop-types";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import {
  MAX_PRICE_RANGE,
  MIN_PRICE_RANGE,
  RANGE_STEP,
} from "../../constants/filterConstants";

const PriceRangeFilter = ({ price, onPriceChange }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm w-full max-w-xs">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Price Range</h3>

      <div className="flex flex-col items-center">
        <input
          type="range"
          min={MIN_PRICE_RANGE}
          max={MAX_PRICE_RANGE}
          step={RANGE_STEP}
          value={price}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <span className="mt-2 text-sm text-gray-600">
          Up to
          <span className="font-medium text-blue-600">
            {CURRENCY_SYMBOL}
            {price}
          </span>
        </span>
      </div>
    </div>
  );
};

PriceRangeFilter.propTypes = {
  price: PropTypes.number.isRequired,
  onPriceChange: PropTypes.func.isRequired,
};

export default PriceRangeFilter;
