import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Doctors = lazy(() => import("../pages/Doctors"));
const Login = lazy(() => import("../pages/Login"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Appointment = lazy(() => import("../pages/Appointment"));
const MyAppointments = lazy(() => import("../pages/MyAppointments"));
const MyProfile = lazy(() => import("../pages/MyProfile"));
const Verify = lazy(() => import("../pages/Verify"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const protectedRoutes = [
  { path: "/", component: Home },
  { path: "/doctors", component: Doctors },
  { path: "/doctors/:speciality", component: Doctors },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/privacy-policy", component: PrivacyPolicy },
  { path: "/appointment/:docId", component: Appointment },
  { path: "/my-appointments", component: MyAppointments },
  { path: "/my-profile", component: MyProfile },
  { path: "/verify", component: Verify },
];

export const publicRoutes = [{ path: "/login", component: Login }];

export const errorRoutes = [{ path: "/404", component: NotFound }];

