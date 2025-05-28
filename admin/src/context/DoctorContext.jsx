import PropTypes from "prop-types";
import { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../utils/api";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(
    () => localStorage.getItem("dToken") || ""
  );
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const isAppoinmentAvailable = useMemo(
    () => !appointments || appointments.length === 0,
    [appointments]
  );

  const authHeader = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${dToken}`,
      },
    }),
    [dToken]
  );

  // Fetch Appointments
  const getAppointments = useCallback(
    async (page = 1, limit = 7) => {
      try {
        const { data } = await api.get(
          API_ENDPOINTS.DOCTOR.APPOINTMENTS(page, limit),
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
        console.error(error);
      }
    },
    [authHeader]
  );

  // Fetch Profile
  const getProfileData = useCallback(async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.DOCTOR.PROFILE, authHeader);
      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }, [authHeader]);

  // Fetch Dashboard
  const getDashData = useCallback(async () => {
    try {
      const { data } = await api.get(
        API_ENDPOINTS.DOCTOR.DASHBOARD,
        authHeader
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }, [authHeader]);

  // Cancel Appointment
  const cancelAppointment = useCallback(
    async (appointmentId) => {
      try {
        const { data } = await api.post(
          API_ENDPOINTS.DOCTOR.CANCEL_APPOINMENT,
          { appointmentId },
          authHeader
        );

        if (data.success) {
          toast.success(data.message);
          getAppointments();
          getDashData();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    },
    [authHeader, getAppointments, getDashData]
  );

  // Complete Appointment
  const completeAppointment = useCallback(
    async (appointmentId) => {
      try {
        const { data } = await api.post(
          API_ENDPOINTS.DOCTOR.COMPLETE_APPOINMENT,
          { appointmentId },
          authHeader
        );

        if (data.success) {
          toast.success(data.message);
          getAppointments();
          getDashData();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    },
    [authHeader, getAppointments, getDashData]
  );

  // Shared context value
  const contextValue = useMemo(
    () => ({
      dToken,
      setDToken,
      appointments,
      totalAppointments,
      isAppoinmentAvailable,
      dashData,
      profileData,
      getAppointments,
      getDashData,
      getProfileData,
      cancelAppointment,
      completeAppointment,
      setProfileData,
    }),
    [
      dToken,
      appointments,
      totalAppointments,
      isAppoinmentAvailable,
      dashData,
      profileData,
      getAppointments,
      getDashData,
      getProfileData,
      cancelAppointment,
      completeAppointment,
    ]
  );

  return (
    <DoctorContext.Provider value={contextValue}>
      {children}
    </DoctorContext.Provider>
  );
};

DoctorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoctorContextProvider;
