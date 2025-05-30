import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const RootRoute = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  if (aToken) {
    return <Navigate to="/admin-dashboard" replace />;
  } else if (dToken) {
    return <Navigate to="/doctor-dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default RootRoute;
