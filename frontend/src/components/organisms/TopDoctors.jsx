import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import EmptyState from "../atoms/EmptyState";
import MoreButton from "../atoms/MoreButton";
import SectionTitle from "../atoms/SectionTitle";
import DoctorCard from "../molecules/DoctorCard";
const TopDoctors = () => {
  const { doctors, isDoctorAvailable } = useContext(AppContext);

  return (
    <section aria-labelledby="Top doctors">
      <div
        id="topDoctors"
        className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10"
      >
        <SectionTitle
          title="Top Doctors to Book"
          subtitle="Simply browse through our extensive list of trusted doctors."
        />

        {isDoctorAvailable ? (
          <section aria-labelledby="Empty state heading">
            <EmptyState
              title="No Doctors Available"
              subtitle="Please check back later or add some doctors."
            />
          </section>
        ) : (
          <div>
            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
              {doctors.slice(0, 10).map((doctor) => (
                <div key={doctor._id} role="listitem">
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
            <MoreButton />
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDoctors;
