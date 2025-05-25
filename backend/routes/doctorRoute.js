import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  changeAvailablity,
  doctorDashboard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor);

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
