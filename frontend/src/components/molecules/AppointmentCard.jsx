import { useState } from "react";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { slotDateFormat } from "../../utils/dateUtils";

const AppointmentCard = ({
  appointment,
  onCancelAppointment,
  onStripePayment,
  index = 1,
  total = 1,
}) => {
  const [payment, setPayment] = useState("");

  const getAppointmentStatus = () => {
    if (appointment.cancelled) return "cancelled";
    if (appointment.isCompleted) return "completed";
    if (appointment.payment) return "paid";
  };

  const status = getAppointmentStatus();

  return (
    <article
      className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6"
      aria-labelledby={`appointment-${appointment._id}-doctor`}
      aria-describedby={`appointment-${appointment._id}-details`}
    >
      <div className="flex-shrink-0">
        <img
          className="w-36 bg-blue-50 rounded-lg"
          src={appointment.docData.image}
          alt={`Dr. ${appointment.docData.name}, ${appointment.docData.speciality} specialist`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex-1 text-sm text-gray-700">
        <h3
          id={`appointment-${appointment._id}-doctor`}
          className="text-gray-800 text-base font-semibold"
        >
          Dr. {appointment.docData.name}
        </h3>

        <p className="text-gray-600">{appointment.docData.speciality}</p>

        <div className="mt-2">
          <h4 className="text-gray-800 font-medium">Address:</h4>
          <address className="not-italic text-gray-600">
            {appointment.docData.address.line1}
            {appointment.docData.address.line2 && (
              <>
                <br />
                {appointment.docData.address.line2}
              </>
            )}
          </address>
        </div>

        <div id={`appointment-${appointment._id}-details`} className="mt-2">
          <span className="text-sm text-gray-800 font-medium">
            Date & Time:
          </span>{" "}
          <time dateTime={appointment.slotDate}>
            {slotDateFormat(appointment.slotDate)} | {appointment.slotTime}
          </time>
        </div>

        <div className="sr-only">
          Appointment {index} of {total}. Status: {status}.
          {status === "paid" && "Payment completed."}
          {status === "completed" && "Appointment completed."}
          {status === "cancelled" && "Appointment cancelled."}
        </div>
      </div>

      <div></div>

      <div className="flex flex-col gap-2 justify-end text-sm text-center">
        {!appointment.cancelled &&
          !appointment.payment &&
          !appointment.isCompleted &&
          payment !== appointment._id && (
            <button
              type="button"
              onClick={() => setPayment(appointment._id)}
              className="text-gray-700 sm:min-w-48 py-2 border border-gray-300 rounded hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none"
              aria-describedby={`pay-help-${appointment._id}`}
            >
              Pay Online
            </button>
          )}

        {!appointment.cancelled &&
          !appointment.payment &&
          !appointment.isCompleted &&
          payment === appointment._id && (
            <button
              type="button"
              onClick={() => onStripePayment(appointment._id)}
              className="text-gray-700 sm:min-w-48 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-all duration-300 flex items-center justify-center focus:outline-none"
              aria-label="Pay with Stripe"
              aria-describedby={`stripe-help-${appointment._id}`}
            >
              <img
                className="max-w-20 max-h-5"
                src={assets.stripe_logo}
                alt="Stripe payment logo"
              />
            </button>
          )}

        {!appointment.cancelled &&
          appointment.payment &&
          !appointment.isCompleted && (
            <div
              className="sm:min-w-48 py-2 border border-gray-300 rounded text-gray-700 bg-blue-50 flex items-center justify-center"
              role="status"
              aria-label="Payment completed"
            >
              <span>Paid</span>
            </div>
          )}

        {appointment.isCompleted && (
          <div
            className="sm:min-w-48 py-2 border border-green-500 rounded text-green-600 flex items-center justify-center"
            role="status"
            aria-label="Appointment completed"
          >
            <span>Completed</span>
          </div>
        )}

        {!appointment.cancelled && !appointment.isCompleted && (
          <button
            type="button"
            onClick={() => onCancelAppointment(appointment._id)}
            className="text-gray-700 sm:min-w-48 py-2 border border-gray-300 rounded hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none"
            aria-describedby={`cancel-help-${appointment._id}`}
          >
            Cancel appointment
          </button>
        )}

        {appointment.cancelled && !appointment.isCompleted && (
          <div
            className="sm:min-w-48 py-2 border border-red-500 rounded text-red-600 flex items-center justify-center"
            role="status"
            aria-label="Appointment cancelled"
          >
            <span>Appointment cancelled</span>
          </div>
        )}

        <div className="sr-only">
          <p id={`pay-help-${appointment._id}`}>
            Click to proceed with online payment for this appointment
          </p>
          <p id={`stripe-help-${appointment._id}`}>
            Complete payment securely through Stripe payment processor
          </p>
          <p id={`cancel-help-${appointment._id}`}>
            Cancel this appointment. This action cannot be undone.
          </p>
        </div>
      </div>
    </article>
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
  onStripePayment: PropTypes.func.isRequired,
  index: PropTypes.number,
  total: PropTypes.number,
};

export default AppointmentCard;
