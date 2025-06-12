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
import PageTitle from "../components/atoms/PageTitle";

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

  const pageTitle = speciality ? `${speciality} Doctors` : "Find Doctors";

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
      <main id="main-content" className="mt-11">
        <PageTitle normalText="ALL" boldText="DOCTORS" />

        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {!isDoctorAvailable &&
            !isFilteredDoctorAvailable &&
            `Found ${filteredDoctors.length} doctor${
              filteredDoctors.length !== 1 ? "s" : ""
            }`}
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`py-2 px-4 border rounded-lg text-sm transition-all lg:hidden focus:outline-none focus:ring-2 focus:ring-primary ${
              showFilter
                ? "bg-primary text-white border-primary"
                : "border-gray-300 hover:border-gray-400"
            }`}
            aria-expanded={showFilter}
            aria-controls="filter-panel"
            aria-label={
              showFilter ? "Hide doctor filters" : "Show doctor filters"
            }
            type="button"
          >
            Filters
          </button>
          <aside
            id="filter-panel"
            className={`w-full lg:w-48 space-y-4 ${
              showFilter ? "block" : "hidden lg:block"
            }`}
            aria-label="Doctor search filters"
            role="complementary"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Filter Doctors
            </h2>

            <SpecialityFilter showFilter={showFilter} speciality={speciality} />
            <PriceRangeFilter
              price={filterPrice}
              onPriceChange={setFilterPrice}
            />
          </aside>
          <section
            className="flex-1 min-w-0"
            aria-labelledby="doctors-results-heading"
          >
            <div className="flex justify-end mb-4">
              <ExperienceFilter
                sortValue={sortExp}
                onSortChange={setSortExp}
                id="experience-sort"
              />
            </div>
            {isDoctorAvailable || isFilteredDoctorAvailable ? (
              <EmptyState
                role="status"
                aria-live="polite"
                title="No Doctors Available"
                subtitle={
                  speciality
                    ? `No doctors available for "${speciality}". Please try a different speciality or reset filters.`
                    : "Please check back later or add some doctors."
                }
              />
            ) : (
              <div
                className="w-full grid grid-cols-auto gap-4 gap-y-6"
                role="list"
                aria-label={`${filteredDoctors.length} doctors found`}
              >
                {filteredDoctors.map((doctor, index) => (
                  <div
                    key={doctor._id}
                    role="listitem"
                    aria-label={`Doctor ${index + 1} of ${
                      filteredDoctors.length
                    }`}
                  >
                    <DoctorCard doctor={doctor} />
                  </div>
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
