import AuthenticatedLayout from "./layout/AuthenticatedLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import RootRoute from "./routes/RootRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy } from "react";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminAppointments = lazy(() => import("./pages/Admin/AdminAppointments"));
const AddDoctor = lazy(() => import("./pages/Admin/AddDoctor"));
const UpdateDoctor = lazy(() => import("./pages/Admin/UpdateDoctor"));
const DoctorsList = lazy(() => import("./pages/Admin/DoctorsList"));
const DoctorDetails = lazy(() => import("./pages/Admin/DoctorDetails"));
const DoctorDashboard = lazy(() => import("./pages/Doctor/DoctorDashboard"));
const DoctorAppointments = lazy(() =>
  import("./pages/Doctor/DoctorAppointments")
);
const DoctorProfile = lazy(() => import("./pages/Doctor/DoctorProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const adminRoutes = [
  { path: "/admin-dashboard", component: AdminDashboard },
  { path: "/all-appointments", component: AdminAppointments },
  { path: "/add-doctor", component: AddDoctor },
  { path: "/update-doctor", component: UpdateDoctor },
  { path: "/doctor-details", component: DoctorDetails },
  { path: "/doctor-list", component: DoctorsList },
];

const doctorRoutes = [
  { path: "/doctor-dashboard", component: DoctorDashboard },
  { path: "/doctor-appointments", component: DoctorAppointments },
  { path: "/doctor-profile", component: DoctorProfile },
];

const App = () => {
  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/" element={<RootRoute />} />

        {adminRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRole="admin">
                <AuthenticatedLayout>
                  <Component />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
        ))}

        {doctorRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRole="doctor">
                <AuthenticatedLayout>
                  <Component />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
        ))}

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
};

export default App;
