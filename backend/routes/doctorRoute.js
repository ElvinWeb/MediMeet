import express from "express";
import {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorList,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  changeAvailablity,
} from "../controllers/doctorController.js";

import authDoctor from "../middleware/authDoctor.js";

const router = express.Router();

// ---------- Public Route ----------
router.post("/login", loginDoctor);

// ---------- Protected Routes ----------
router.use(authDoctor);

// Appointment Management
router.get("/appointments", appointmentsDoctor);
router.post("/cancel-appointment", appointmentCancel);
router.post("/complete-appointment", appointmentComplete);

// Profile & Availability
router.get("/profile", doctorProfile);
router.post("/update-profile", updateDoctorProfile);
router.post("/change-availability", changeAvailablity);

// Dashboard
router.get("/dashboard", doctorDashboard);

// Public List
router.get("/list", doctorList);

export default router;
