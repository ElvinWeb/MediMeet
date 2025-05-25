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

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.use(authUser);

userRouter.get("/get-profile", getProfile);
userRouter.post("/update-profile", upload.single("image"), updateProfile);
userRouter.post("/book-appointment", bookAppointment);
userRouter.get("/appointments", listAppointment);
userRouter.post("/cancel-appointment", cancelAppointment);
userRouter.post("/payment-stripe", paymentStripe);
userRouter.post("/verifyStripe", verifyStripe);

export default userRouter;
