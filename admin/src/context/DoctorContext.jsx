import { createContext, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { API_ENDPOINTS, BACKEND_URL } from "../constants/apiEndpoints";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const isAppoinmentAvailable = !appointments || appointments.length === 0;

  // Getting Doctor appointment data from Database using API
  const getAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        BACKEND_URL + API_ENDPOINTS.DOCTOR.APPOINTMENTS,
        { headers: { dToken } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [dToken]);

  // Getting Doctor profile data from Database using API
  const getProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        BACKEND_URL + API_ENDPOINTS.DOCTOR.PROFILE,
        {
          headers: { dToken },
        }
      );
      setProfileData(data.profileData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [dToken]);

  // Function to cancel doctor appointment using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.DOCTOR.CANCEL_APPOINMENT,
        { appointmentId },
        { headers: { dToken } }
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
      console.log(error);
    }
  };

  // Function to Mark appointment completed using API
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.DOCTOR.COMPLETE_APPOINMENT,
        { appointmentId },
        { headers: { dToken } }
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
      console.log(error);
    }
  };

  // Getting Doctor dashboard data using API
  const getDashData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        BACKEND_URL + API_ENDPOINTS.DOCTOR.DASHBOARD,
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [dToken]);

  const value = {
    dToken,
    appointments,
    dashData,
    profileData,
    isAppoinmentAvailable,
    setDToken,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    getDashData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

DoctorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DoctorContextProvider;
