import axios from "axios";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookingSlots from "../components/BookingSlots";
import DoctorDetails from "../components/DoctorDetails";
import RelatedDoctors from "../components/RelatedDoctors";
import { API_ENDPOINTS, BACKEND_URL } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import {
  generateAvailableSlots,
  formatSlotDate,
} from "../utils/appointmentUtils";

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
      const { data } = await axios.post(
        `${BACKEND_URL}${API_ENDPOINTS.USER.BOOK_APPOINTMENT}`,
        { docId, slotDate, slotTime },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    if (doctors && docId) {
      fetchDocInfo();
    }
  }, [doctors, docId, fetchDocInfo]);

  return docInfo ? (
    <div>
      <DoctorDetails docInfo={docInfo} />

      {docInfo.available && (
        <BookingSlots
          docSlots={docSlots}
          onBookAppointment={bookAppointment}
          slotIndex={slotIndex}
          slotTime={slotTime}
          onSlotIndex={setSlotIndex}
          onSlotTime={setSlotTime}
        />
      )}

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
