import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { useCallback } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const isDoctorAvailable = !doctors || doctors.length === 0;

  const getDoctosData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + API_ENDPOINTS.DOCTOR.LIST);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl]);

  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        backendUrl + API_ENDPOINTS.USER.GET_PROFILE,
        {
          headers: { token },
        }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    getDoctosData();
  }, [getDoctosData]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [loadUserProfileData, token]);

  const value = {
    doctors,
    backendUrl,
    token,
    userData,
    isDoctorAvailable,
    setToken,
    getDoctosData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
