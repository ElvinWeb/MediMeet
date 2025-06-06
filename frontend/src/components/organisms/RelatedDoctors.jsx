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
    <section aria-labelledby="related-doctors-heading">
      <div className="flex flex-col items-center gap-4 my-16 text-gray-800">
        <SectionTitle
          title="Related Doctors"
          subtitle="Simply browse through our extensive list of trusted doctors."
          headingId="related-doctors-heading"
        />

        {relDoc.length === 0 ? (
          <div role="status" aria-live="polite">
            <EmptyState
              title="No Related Doctors Available"
              subtitle="Please check back later or browse other specialties."
            />
          </div>
        ) : (
          <div className="w-full">
            <div className="sr-only" aria-live="polite">
              Found {relDoc.length} related {speciality} doctor
              {relDoc.length !== 1 ? "s" : ""}
            </div>

            <ul
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5 px-3 sm:px-0"
              role="list"
              aria-label={`${relDoc.length} related ${speciality} doctors`}
            >
              {relDoc.map((doctor, index) => (
                <li
                  key={doctor._id}
                  role="listitem"
                  aria-label={`Doctor ${index + 1} of ${relDoc.length}`}
                >
                  <DoctorCard doctor={doctor} />
                </li>
              ))}
            </ul>

            <div className="text-center mt-8">
              <MoreButton
                ariaLabel={`View more ${speciality} doctors`}
                ariaDescribedBy="more-related-help"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

RelatedDoctors.propTypes = {
  speciality: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};

export default RelatedDoctors;
