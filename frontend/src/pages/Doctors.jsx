import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorCard from "../components/molecules/DoctorCard";
import EmptyState from "../components/atoms/EmptyState";
import ExperienceFilter from "../components/molecules/ExperienceFilter";
import PriceRangeFilter from "../components/molecules/PriceRangeFilter";
import SpecialityFilter from "../components/molecules/SpecialityFilter";
import { MAX_PRICE_RANGE } from "../constants/filterConstants";
import { AppContext } from "../context/AppContext";
import SEOHelmet from "../components/SEO/SEOHelmet";

const Doctors = () => {
  const { speciality } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filterPrice, setFilterPrice] = useState(MAX_PRICE_RANGE);
  const [sortExp, setSortExp] = useState("default");
  const { doctors, isDoctorAvailable } = useContext(AppContext);

  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    if (speciality) {
      result = result.filter((doc) => doc.speciality === speciality);
    }

    result = result.filter((doc) => doc.fees <= filterPrice);

    if (sortExp === "exp-low-high") {
      result.sort((a, b) => parseInt(a.experience) - parseInt(b.experience));
    } else if (sortExp === "exp-high-low") {
      result.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }

    return result;
  }, [doctors, speciality, filterPrice, sortExp]);

  const isFilteredDoctorAvailable =
    !filteredDoctors || filteredDoctors.length === 0;

  const pageTitle = speciality
    ? `${speciality} Doctors`
    : "Find Doctors";

  const pageDescription = speciality
    ? `Find qualified ${speciality} doctors. Compare experience, fees, and availability. Book appointments online with MediMeet.`
    : "Find and book appointments with qualified doctors. Browse by specialty, experience, and fees. Secure online medical appointment booking.";

  const pageKeywords = speciality
    ? `${speciality} doctors, ${speciality} specialists, book ${speciality} appointment, medical consultation`
    : "doctors, medical specialists, healthcare provider, book doctor appointment, online medical consultation";

  return (
    <>
      <SEOHelmet
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
      />
      <main className="mt-11">
        <h1 className="sr-only">{pageTitle}</h1>

        <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${
              showFilter ? "bg-primary text-white" : ""
            }`}
            aria-expanded={showFilter}
            aria-controls="filter-panel"
            aria-label={showFilter ? "Hide filters" : "Show filters"}
            type="button"
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
          <section className="flex-1">
            <div className="flex justify-between mb-4">
              <div className="text-2xl text-[#707070]">
                <p>
                  All{" "}
                  <span className="text-gray-700 font-semibold">Doctors</span>
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
                {filteredDoctors.map((doctor) => (
                  <DoctorCard doctor={doctor} key={doctor._id} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Doctors;
