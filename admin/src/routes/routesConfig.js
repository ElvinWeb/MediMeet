import { lazy } from "react";
import RootRoute from "./RootRoute";

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const AdminAppointments = lazy(() => import("../pages/Admin/AdminAppointments"));
const AddDoctor = lazy(() => import("../pages/Admin/AddDoctor"));
const UpdateDoctor = lazy(() => import("../pages/Admin/UpdateDoctor"));
const DoctorsList = lazy(() => import("../pages/Admin/DoctorsList"));
const DoctorDetails = lazy(() => import("../pages/Admin/DoctorDetails"));
const DoctorDashboard = lazy(() => import("../pages/Doctor/DoctorDashboard"));
const DoctorAppointments = lazy(() =>
  import("../pages/Doctor/DoctorAppointments")
);
const DoctorProfile = lazy(() => import("../pages/Doctor/DoctorProfile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));

export const adminRoutes = [
  { path: "/admin-dashboard", component: AdminDashboard },
  { path: "/all-appointments", component: AdminAppointments },
  { path: "/add-doctor", component: AddDoctor },
  { path: "/update-doctor", component: UpdateDoctor },
  { path: "/doctor-details", component: DoctorDetails },
  { path: "/doctor-list", component: DoctorsList },
];

export const doctorRoutes = [
  { path: "/doctor-dashboard", component: DoctorDashboard },
  { path: "/doctor-appointments", component: DoctorAppointments },
  { path: "/doctor-profile", component: DoctorProfile },
];

export const publicRoutes = [{ path: "/login", component: Login }];

export const rootRoutes = [{ path: "/", component: RootRoute }];

export const errorRoutes = [{ path: "/404", component: NotFound }];