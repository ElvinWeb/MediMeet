export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ENDPOINTS = {
  ADMIN: {
    ALL_DOCTORS: "/api/admin/all-doctors",
    CHANGE_AVAILABILITY: "/api/admin/change-availability",
    APPOINTMENTS: (page, limit) =>
      `/api/admin/appointments?page=${page}&limit=${limit}`,
    CANCEL_APPOINMENT: "/api/admin/cancel-appointment",
    DASHBOARD: "/api/admin/dashboard",
    LOGIN: "/api/admin/login",
    ADD_DOCTOR: "/api/admin/add-doctor",
    DELETE_DOCTOR: (id) => `/api/admin/doctor/${id}`,
    UPDATE_DOCTOR: (id) => `/api/admin/doctor/${id}`,
  },
  DOCTOR: {
    CANCEL_APPOINMENT: "/api/doctor/cancel-appointment",
    APPOINTMENTS: (page, limit) =>
      `/api/doctor/appointments?page=${page}&limit=${limit}`,
    PROFILE: "/api/doctor/profile",
    COMPLETE_APPOINMENT: "/api/doctor/complete-appointment",
    DASHBOARD: "/api/doctor/dashboard",
    LOGIN: "/api/doctor/login",
    UPDATE_PROFILE: "/api/doctor/update-profile",
  },
};
