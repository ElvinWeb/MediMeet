export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ENDPOINTS = {
  USER: {
    GET_PROFILE: "/api/user/get-profile",
    UPDATE_PROFILE: "/api/user/update-profile",
    REGISTER: "/api/user/register",
    LOGIN: "/api/user/login",
    STRIPE_VERIFY: "/api/user/verifyStripe",
    STRIPE_PAYMENT: "/api/user/payment-stripe",
    APPOINTMENTS: "/api/user/appointments",
    BOOK_APPOINTMENT: "/api/user/book-appointment",
    CANCEL_APPOINTMENT: "/api/user/cancel-appointment",
  },
  DOCTOR: {
    LIST: "/api/doctor/list",
  },
};
