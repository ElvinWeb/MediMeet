import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";

// App instance
const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB and Cloudinary
await connectDB();
await connectCloudinary();

// ---------- Middlewares ----------
app.use(express.json({ limit: "10kb" }));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());

// ---------- Routes ----------
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// ---------- Root Endpoint ----------
app.get("/", (_, res) => {
  res.status(200).json({ message: "Server running successfully ✅" });
});

// ---------- Not Found & Error Handler ----------
app.all("*", (_, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Central error handler LAST
app.use(errorHandler);

// ---------- Server ----------
app.listen(PORT, () =>
  logger.info(`🚀 Server running on http://localhost:${PORT}`)
);
