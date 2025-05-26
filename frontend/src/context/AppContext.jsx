import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS, BACKEND_URL } from "../constants/apiEndpoints";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const isDoctorAvailable = !doctors || doctors.length === 0;

  // Get all doctors
  const getDoctosData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}${API_ENDPOINTS.DOCTOR.LIST}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching doctors");
    }
  }, [token]);

  // Get user profile
  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}${API_ENDPOINTS.USER.GET_PROFILE}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to load user profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while loading user profile");
    }
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
