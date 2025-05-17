import { assets } from "../assets/assets";

export const ADMIN_SIDEBAR_LIST = [
  {
    id: 1,
    path: "/admin-dashboard",
    name: "Dashboard",
    icon: assets.home_icon,
  },
  {
    id: 2,
    path: "/all-appointments",
    name: "Appointments",
    icon: assets.appointment_icon,
  },
  {
    id: 3,
    path: "/add-doctor",
    name: "Add Doctor",
    icon: assets.add_icon,
  },
  {
    id: 4,
    path: "/doctor-list",
    name: "Doctors List",
    icon: assets.people_icon,
  },
];

export const DOCTOR_SIDEBAR_LIST = [
  {
    id: 1,
    path: "/doctor-dashboard",
    name: "Dashboard",
    icon: assets.home_icon,
  },
  {
    id: 2,
    path: "/doctor-appointments",
    name: "Appointments",
    icon: assets.appointment_icon,
  },
  {
    id: 3,
    path: "/doctor-profile",
    name: "Profile",
    icon: assets.people_icon,
  },
];
