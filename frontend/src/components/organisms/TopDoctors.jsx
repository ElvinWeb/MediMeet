import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import EmptyState from "../atoms/EmptyState";
import MoreButton from "../atoms/MoreButton";
import SectionTitle from "../atoms/SectionTitle";
import DoctorCard from "../molecules/DoctorCard";
const TopDoctors = () => {
  const { doctors, isDoctorAvailable } = useContext(AppContext);

  return (
    <div
      id="topDoctors"
      className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10"
    >
      <SectionTitle
        title="Top Doctors to Book"
        subtitle="Simply browse through our extensive list of trusted doctors."
      />

      {isDoctorAvailable ? (
        <EmptyState
          title="No Doctors Available"
          subtitle="Please check back later or add some doctors."
        />
      ) : (
        <>
          <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
            {doctors.slice(0, 10).map((doctor) => (
              <DoctorCard doctor={doctor} key={doctor._id} />
            ))}
          </div>
          <MoreButton />
        </>
      )}
    </div>
  );
};

export default TopDoctors;
