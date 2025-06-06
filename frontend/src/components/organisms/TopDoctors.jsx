import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import EmptyState from "../atoms/EmptyState";
import MoreButton from "../atoms/MoreButton";
import SectionTitle from "../atoms/SectionTitle";
import DoctorCard from "../molecules/DoctorCard";
const TopDoctors = () => {
  const { doctors, isDoctorAvailable } = useContext(AppContext);

  return (
    <section aria-labelledby="top-doctors-heading">
      <div
        id="topDoctors"
        className="flex flex-col items-center gap-4 my-16 text-gray-700 md:mx-10"
      >
        <SectionTitle
          title="Top Doctors to Book"
          subtitle="Simply browse through our extensive list of trusted doctors."
          headingId="top-doctors-heading"
        />

        {isDoctorAvailable ? (
          <div role="status" aria-live="polite">
            <EmptyState
              title="No Doctors Available"
              subtitle="Please check back later or contact support for assistance."
            />
          </div>
        ) : (
          <div className="w-full">
            <div
              className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0"
              role="list"
              aria-label={`${
                doctors.slice(0, 10).length
              } featured doctors available for booking`}
            >
              {doctors.slice(0, 10).map((doctor, index) => (
                <div
                  key={doctor._id}
                  role="listitem"
                  aria-label={`Doctor ${index + 1} of ${
                    doctors.slice(0, 10).length
                  }`}
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <MoreButton ariaLabel="View all available doctors" />
              <p id="more-doctors-description" className="sr-only">
                Browse through our complete directory of qualified healthcare
                professionals
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDoctors;
