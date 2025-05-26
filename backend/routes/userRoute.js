import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointment,
  loginUser,
  paymentStripe,
  registerUser,
  updateProfile,
  verifyStripe,
} from "../controllers/userController.js";

import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// ---------- Public Routes ----------
router.post("/register", registerUser);
router.post("/login", loginUser);

// ---------- Protected Routes ----------
router.use(authUser);

// Profile Management
router.get("/get-profile", getProfile);
router.post("/update-profile", upload.single("image"), updateProfile);

// Appointment Handling
router.post("/book-appointment", bookAppointment);
router.get("/appointments", listAppointment);
router.post("/cancel-appointment", cancelAppointment);

// Payments
router.post("/payment-stripe", paymentStripe);
router.post("/verifyStripe", verifyStripe);

export default router;
