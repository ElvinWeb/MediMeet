import { useState } from "react";
import PropTypes from "prop-types";
import { assets } from "../assets/assets";
import { slotDateFormat } from "../utils/dateUtils";

const AppointmentCard = ({
  appointment,
  onCancelAppointment,
  onAppointmentStripe,
}) => {
  const [payment, setPayment] = useState("");

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b">
      <div>
        <img
          className="w-36 bg-[#EAEFFF]"
          src={appointment.docData.image}
          alt=""
        />
      </div>
      <div className="flex-1 text-sm text-[#5E5E5E]">
        <p className="text-[#262626] text-base font-semibold">
          {appointment.docData.name}
        </p>
        <p>{appointment.docData.speciality}</p>
        <p className="text-[#464646] font-medium mt-1">Address:</p>
        <p className="">{appointment.docData.address.line1}</p>
        <p className="">{appointment.docData.address.line2}</p>
        <p className=" mt-1">
          <span className="text-sm text-[#3C3C3C] font-medium">
            Date & Time:
          </span>{" "}
          {slotDateFormat(appointment.slotDate)} | {appointment.slotTime}
        </p>
      </div>
      <div></div>
      <div className="flex flex-col gap-2 justify-end text-sm text-center">
        {!appointment.cancelled &&
          !appointment.payment &&
          !appointment.isCompleted &&
          payment !== appointment._id && (
            <button
              onClick={() => setPayment(appointment._id)}
              className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
            >
              Pay Online
            </button>
          )}
        {!appointment.cancelled &&
          !appointment.payment &&
          !appointment.isCompleted &&
          payment === appointment._id && (
            <button
              onClick={() => onAppointmentStripe(appointment._id)}
              className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <img
                className="max-w-20 max-h-5"
                src={assets.stripe_logo}
                alt=""
              />
            </button>
          )}
        {!appointment.cancelled &&
          appointment.payment &&
          !appointment.isCompleted && (
            <button className="sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]">
              Paid
            </button>
          )}

        {appointment.isCompleted && (
          <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
            Completed
          </button>
        )}

        {!appointment.cancelled && !appointment.isCompleted && (
          <button
            onClick={() => onCancelAppointment(appointment._id)}
            className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Cancel appointment
          </button>
        )}
        {appointment.cancelled && !appointment.isCompleted && (
          <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
            Appointment cancelled
          </button>
        )}
      </div>
    </div>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    docData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      speciality: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      address: PropTypes.shape({
        line1: PropTypes.string.isRequired,
        line2: PropTypes.string,
      }).isRequired,
    }).isRequired,
    slotDate: PropTypes.string.isRequired,
    slotTime: PropTypes.string.isRequired,
    cancelled: PropTypes.bool.isRequired,
    payment: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onCancelAppointment: PropTypes.func.isRequired,
  onAppointmentStripe: PropTypes.func.isRequired,
};

export default AppointmentCard;
