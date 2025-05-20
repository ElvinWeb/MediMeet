import express from "express";
import {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  changeAvailablity,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";
import rateLimit from "express-rate-limit";

const doctorRouter = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later!",
});

doctorRouter.post("/login", authLimiter, loginDoctor);

doctorRouter.use(authDoctor);

doctorRouter.post("/cancel-appointment", appointmentCancel);
doctorRouter.get("/appointments", appointmentsDoctor);
doctorRouter.get("/list", doctorList);
doctorRouter.post("/change-availability", changeAvailablity);
doctorRouter.post("/complete-appointment", appointmentComplete);
doctorRouter.get("/dashboard", doctorDashboard);
doctorRouter.get("/profile", doctorProfile);
doctorRouter.post("/update-profile", updateDoctorProfile);

export default doctorRouter;
