import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookingSlots from "../components/BookingSlots";
import DoctorDetails from "../components/DoctorDetails";
import RelatedDoctors from "../components/RelatedDoctors";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import {
  generateAvailableSlots,
  formatSlotDate,
} from "../utils/appointmentUtils";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctosData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  console.log(docSlots)

  const fetchDocInfo = useCallback(async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }, [doctors, docId]);

  const getAvailableSolts = useCallback(() => {
    if (docInfo) {
      const slots = generateAvailableSlots(docInfo.slots_booked);
      setDocSlots(slots);
    }
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    const selectedDate = docSlots?.[slotIndex]?.[0]?.datetime;
    if (!selectedDate) return;

    const slotDate = formatSlotDate(selectedDate);

    try {
      const { data } = await axios.post(
        backendUrl + API_ENDPOINTS.USER.BOOK_APPOINTMENT,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId, fetchDocInfo]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts();
    }
  }, [docInfo, getAvailableSolts]);

  return docInfo ? (
    <div>
      {/* ---------- Doctor Details ----------- */}
      <DoctorDetails docInfo={docInfo} />

      {/* Booking slots */}
      <BookingSlots
        docSlots={docSlots}
        onBookAppointment={bookAppointment}
        slotIndex={slotIndex}
        slotTime={slotTime}
        onSlotIndex={setSlotIndex}
        onSlotTime={setSlotTime}
      />

      {/* Listing Releated Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
