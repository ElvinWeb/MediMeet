import PropTypes from "prop-types";
import { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../utils/api";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    () => sessionStorage.getItem("aToken") || ""
  );
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [dashData, setDashData] = useState(null);

  // Memoized check for appointment availability
  const isAppoinmentAvailable = useMemo(
    () => !appointments || appointments.length === 0,
    [appointments]
  );

  const authHeader = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${aToken}`,
      },
    }),
    [aToken]
  );

  // Fetch all doctors
  const getAllDoctors = useCallback(async () => {
    try {
      const { data } = await api.get(
        API_ENDPOINTS.ADMIN.ALL_DOCTORS,
        authHeader
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [authHeader]);

  // Fetch admin dashboard stats
  const getDashData = useCallback(async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ADMIN.DASHBOARD, authHeader);
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [authHeader]);

  // Fetch all appointments
  const getAllAppointments = useCallback(
    async (page = 1, limit = 7) => {
      try {
        const { data } = await api.get(
          API_ENDPOINTS.ADMIN.APPOINTMENTS(page, limit),
          authHeader
        );
        if (data.success) {
          setAppointments(data.appointments.reverse());
          setTotalAppointments(data.pagination.total);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [authHeader]
  );

  // Cancel appointment
  const cancelAppointment = useCallback(
    async (appointmentId) => {
      try {
        const { data } = await api.post(
          API_ENDPOINTS.ADMIN.CANCEL_APPOINMENT,
          { appointmentId },
          authHeader
        );
        if (data.success) {
          toast.success(data.message);
          getAllAppointments(); // Refresh list
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [authHeader, getAllAppointments]
  );

  // Toggle doctor availability
  const changeAvailability = useCallback(
    async (docId) => {
      try {
        const { data } = await api.post(
          API_ENDPOINTS.ADMIN.CHANGE_AVAILABILITY,
          { docId },
          authHeader
        );
        if (data.success) {
          toast.success(data.message);
          getAllDoctors();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [authHeader, getAllDoctors]
  );

  const isDoctorAvailable = !doctors || doctors.length === 0;

  const contextValue = useMemo(
    () => ({
      aToken,
      setAToken,
      doctors,
      appointments,
      dashData,
      isAppoinmentAvailable,
      isDoctorAvailable,
      totalAppointments,
      getAllDoctors,
      getDashData,
      getAllAppointments,
      cancelAppointment,
      changeAvailability,
    }),
    [
      aToken,
      doctors,
      appointments,
      dashData,
      isAppoinmentAvailable,
      isDoctorAvailable,
      totalAppointments,
      getAllDoctors,
      getDashData,
      getAllAppointments,
      cancelAppointment,
      changeAvailability,
    ]
  );

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;
