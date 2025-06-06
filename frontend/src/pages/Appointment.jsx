import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookingSlots from "../components/molecules/BookingSlots";
import DoctorDetails from "../components/molecules/DoctorDetails";
import RelatedDoctors from "../components/organisms/RelatedDoctors";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";
import {
  formatSlotDate,
  generateAvailableSlots,
} from "../utils/appointmentUtils";
import SEOHelmet from "../components/SEO/SEOHelmet";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, token, getDoctosData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(false);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  const fetchDocInfo = useCallback(() => {
    if (!docId || !doctors.length) return;
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc || null);
  }, [doctors, docId]);

  const docSlots = useMemo(() => {
    if (!docInfo) return [];
    return generateAvailableSlots(docInfo.slots_booked);
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Please login first.");
      return navigate("/login");
    }

    const selectedDate = docSlots?.[slotIndex]?.[0]?.datetime;
    if (!selectedDate || !slotTime) {
      toast.error("Please select a valid time slot.");
      return;
    }

    try {
      const slotDate = formatSlotDate(selectedDate);
      const { data } = await api.post(API_ENDPOINTS.USER.BOOK_APPOINTMENT, {
        docId,
        slotDate,
        slotTime,
      });

      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (doctors && docId && token) {
      fetchDocInfo();
    }
  }, [doctors, docId, fetchDocInfo, token]);

  if (!docInfo) return null;

  return (
    <>
      <SEOHelmet
        title={`Book Appointment with Dr. ${docInfo.name}`}
        description={`Schedule appointment with Dr. ${docInfo.name}, ${docInfo.speciality} specialist. ${docInfo.experience} years experience. Book online with MediMeet.`}
        keywords={`${docInfo.speciality} doctor, book appointment, Dr ${docInfo.name}, medical consultation`}
      />
      <main id="main-content" tabIndex="-1">
        <h1 className="sr-only">
          Book Appointment with Dr. {docInfo.name}, {docInfo.speciality}{" "}
          Specialist
        </h1>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {slotTime && `Selected appointment time: ${slotTime}`}
          {!docInfo.available && "Doctor is currently unavailable for booking"}
        </div>

        <section aria-labelledby="doctor-info-heading" className="mt-4">
          <h2 id="doctor-info-heading" className="sr-only">
            Doctor Information
          </h2>
          <DoctorDetails docInfo={docInfo} />
        </section>

        {docInfo.available && (
          <section aria-labelledby="booking-section-heading">
            <h2 id="booking-section-heading" className="sr-only">
              Select Appointment Time
            </h2>
            <BookingSlots
              docSlots={docSlots}
              onBookAppointment={bookAppointment}
              slotIndex={slotIndex}
              slotTime={slotTime}
              onSlotIndex={setSlotIndex}
              onSlotTime={setSlotTime}
            />
          </section>
        )}

        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </main>
    </>
  );
};

export default Appointment;
