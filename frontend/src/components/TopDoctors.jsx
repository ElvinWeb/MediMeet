import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "./DoctorCard";
import EmptyState from "./EmptyState";
const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors, isDoctorAvailable } = useContext(AppContext);

  return (
    <div
      id="topDoctors"
      className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10"
    >
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

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
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
          >
            more
          </button>
        </>
      )}
    </div>
  );
};

export default TopDoctors;
