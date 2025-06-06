import PropTypes from "prop-types";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import {
  MAX_PRICE_RANGE,
  MIN_PRICE_RANGE,
  RANGE_STEP,
} from "../../constants/filterConstants";

const PriceRangeFilter = ({ price, onPriceChange }) => {
  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    onPriceChange(newPrice);
  };
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm w-full max-w-xs">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Price Range</h3>

      <div className="flex flex-col items-center">
        <input
          id="price-range"
          type="range"
          min={MIN_PRICE_RANGE}
          max={MAX_PRICE_RANGE}
          step={RANGE_STEP}
          value={price}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-describedby="price-range-help price-display"
          aria-valuemin={MIN_PRICE_RANGE}
          aria-valuemax={MAX_PRICE_RANGE}
          aria-valuenow={price}
          aria-valuetext={`${CURRENCY_SYMBOL}${price} maximum consultation fee`}
        />
        <div id="price-display" className="text-center mt-2" aria-live="polite">
          <span className="text-sm text-gray-600">Up to</span>
          <span className="text-sm font-semibold text-blue-600 ml-1">
            {CURRENCY_SYMBOL}
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

PriceRangeFilter.propTypes = {
  price: PropTypes.number.isRequired,
  onPriceChange: PropTypes.func.isRequired,
};

export default PriceRangeFilter;
