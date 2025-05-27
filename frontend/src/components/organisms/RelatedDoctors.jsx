import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import EmptyState from "../atoms/EmptyState";
import MoreButton from "../atoms/MoreButton";
import SectionTitle from "../atoms/SectionTitle";
import DoctorCard from "../molecules/DoctorCard";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors, token } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

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
      <SectionTitle
        title="Related Doctors"
        subtitle="Simply browse through our extensive list of trusted doctors."
      />

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
          <MoreButton />
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
