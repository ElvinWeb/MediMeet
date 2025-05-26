import express from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// App instance
const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB and Cloudinary
await connectDB();
await connectCloudinary();

// ---------- Middlewares ----------
app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

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

// ---------- Server ----------
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
