import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const PublicRoute = ({ children }) => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const location = useLocation();

  const isAuthenticated = dToken || aToken;

  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    if (from && from !== "/login") {
      return <Navigate to={from} replace />;
    }
    return (
      <Navigate
        to={aToken ? "/admin-dashboard" : "/doctor-dashboard"}
        replace
      />
    );
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
