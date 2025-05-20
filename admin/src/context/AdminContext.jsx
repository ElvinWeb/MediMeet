import axios from "axios";
import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { API_ENDPOINTS, BACKEND_URL } from "../constants/apiEndpoints";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [dashData, setDashData] = useState(false);
  const isAppoinmentAvailable = !appointments || appointments.length === 0;

  // Getting all Doctors data from Database using API
  const getAllDoctors = useCallback(async () => {
    try {
      const { data } = await axios.get(
        BACKEND_URL + API_ENDPOINTS.ADMIN.ALL_DOCTORS,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [aToken]);

  // Function to change doctor availablity using API
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.ADMIN.CHANGE_AVAILABILITY,
        { docId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting all appointment data from Database using API
  const getAllAppointments = useCallback(
    async (page = 1, limit = 7) => {
      try {
        const { data } = await axios.get(
          `${
            BACKEND_URL + API_ENDPOINTS.ADMIN.APPOINTMENTS
          }?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${aToken}`,
            },
          }
        );
        if (data.success) {
          setAppointments(data.appointments.reverse());
          setTotalAppointments(data.pagination.total);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
    [aToken]
  );

  // Function to cancel appointment using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.ADMIN.CANCEL_APPOINMENT,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Getting Admin Dashboard data from Database using API
  const getDashData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        BACKEND_URL + API_ENDPOINTS.ADMIN.DASHBOARD,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
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
  }, [aToken]);

  const value = {
    aToken,
    doctors,
    appointments,
    dashData,
    isAppoinmentAvailable,
    totalAppointments,
    setAToken,
    getAllDoctors,
    changeAvailability,
    getAllAppointments,
    getDashData,
    cancelAppointment,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;
