import express from "express";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import {
  loginAdmin,
  addDoctor,
  deleteDoctor,
  updateDoctor,
  appointmentsAdmin,
  appointmentCancel,
  allDoctors,
  adminDashboard,
} from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const router = express.Router();

// ---------- Public Route ----------
router.post("/login", loginAdmin);

// ---------- Protected Routes ----------
router.use(authAdmin);

// Doctor Management
router.post("/add-doctor", upload.single("image"), addDoctor);
router.put("/doctor/:doctorId", upload.single("image"), updateDoctor);
router.delete("/doctor/:doctorId", deleteDoctor);
router.post("/change-availability", changeAvailablity);
router.get("/all-doctors", allDoctors);

// Appointment Management
router.get("/appointments", appointmentsAdmin);
router.post("/cancel-appointment", appointmentCancel);

// Dashboard
router.get("/dashboard", adminDashboard);

export default router;
