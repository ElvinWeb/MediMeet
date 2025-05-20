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
import rateLimit from "express-rate-limit";

const userRouter = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, please try again later!",
});

userRouter.post("/register", authLimiter, registerUser);
userRouter.post("/login", authLimiter, loginUser);

userRouter.use(authUser);

userRouter.get("/get-profile", getProfile);
userRouter.post("/update-profile", upload.single("image"), updateProfile);
userRouter.post("/book-appointment", bookAppointment);
userRouter.get("/appointments", listAppointment);
userRouter.post("/cancel-appointment", cancelAppointment);
userRouter.post("/payment-stripe", paymentStripe);
userRouter.post("/verifyStripe", verifyStripe);

export default userRouter;
