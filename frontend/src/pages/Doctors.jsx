import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import PriceRangeFilter from "../components/PriceRangeFilter";
import SpecialityFilter from "../components/SpecialityFilter";
import { AppContext } from "../context/AppContext";
import { MAX_PRICE_RANGE } from "../constants/filterConstants";
import ExperienceFilter from "../components/ExperienceFilter";
import EmptyState from "../components/EmptyState";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterPrice, setFilterPrice] = useState(MAX_PRICE_RANGE);
  const [sortExp, setSortExp] = useState("default");
  const { doctors, isDoctorAvailable } = useContext(AppContext);
  const isFilteredDoctorAvailable = !filterDoc || filterDoc.length === 0;

  const applyFilter = useCallback(() => {
    let result = doctors;

    // speciality filter
    if (speciality) {
      result = result.filter((doc) => doc.speciality === speciality);
    }

    // Filter by fees
    result = result.filter((doc) => doc.fees <= filterPrice);

    // sort by experience
    if (sortExp === "exp-low-high") {
      result = [...result].sort((a, b) => {
        const aYears = parseInt(a.experience, 10);
        const bYears = parseInt(b.experience, 10);
        return aYears - bYears;
      });
    } else if (sortExp === "exp-high-low") {
      result = [...result].sort((a, b) => {
        const aYears = parseInt(a.experience, 10);
        const bYears = parseInt(b.experience, 10);
        return bYears - aYears;
      });
    }

    setFilterDoc(result);
  }, [doctors, speciality, sortExp, filterPrice]);

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, sortExp, applyFilter]);

  return (
    <div className="mt-11">
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
        >
          Filters
        </button>
        <div className="flex flex-col sm:flex-column items-start gap-3 w-2xl">
          <SpecialityFilter showFilter={showFilter} speciality={speciality} />
          <PriceRangeFilter
            price={filterPrice}
            onPriceChange={setFilterPrice}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <div className="text-2xl text-[#707070]">
              <p>
                All <span className="text-gray-700 font-semibold">Doctors</span>
              </p>
            </div>
            <ExperienceFilter sortValue={sortExp} onSortChange={setSortExp} />
          </div>
          {isDoctorAvailable || isFilteredDoctorAvailable ? (
            <EmptyState
              title="No Doctors Available"
              subtitle={
                speciality
                  ? `No doctors available for "${speciality}". Please try a different speciality or reset filters.`
                  : "Please check back later or add some doctors."
              }
            />
          ) : (
            <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
              {filterDoc.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
