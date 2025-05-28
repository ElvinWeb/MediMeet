import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import api from "../utils/api";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const isDoctorAvailable = !doctors || doctors.length === 0;

  // Get all doctors
  const getDoctosData = useCallback(async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.DOCTOR.LIST);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching doctors");
    }
  }, []);

  // Get user profile
  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USER.GET_PROFILE);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to load user profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while loading user profile");
    }
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        delete config.headers["Authorization"];
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      getDoctosData();
      loadUserProfileData();
    }
  }, [token, getDoctosData, loadUserProfileData]);

  const contextValue = {
    doctors,
    token,
    userData,
    setDoctors,
    setToken,
    setUserData,
    isDoctorAvailable,
    getDoctosData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
