import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "./DoctorCard";
import EmptyState from "./EmptyState";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors, token } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  const filteredDoctors = useMemo(() => {
    if (!doctors || !speciality || !docId) return [];
    return doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== docId
    );
  }, [doctors, speciality, docId]);

  useEffect(() => {
    if (token) {
      setRelDoc(filteredDoctors);
    }
  }, [filteredDoctors, token]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {relDoc.length === 0 ? (
        <EmptyState
          title="No Related Doctors Available"
          subtitle="Please check back later or add some doctors."
        />
      ) : (
        <>
          <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
            {relDoc.map((doctor) => (
              <DoctorCard doctor={doctor} key={doctor._id} />
            ))}
          </div>
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10"
          >
            More
          </button>
        </>
      )}
    </div>
  );
};

RelatedDoctors.propTypes = {
  speciality: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};

export default RelatedDoctors;
