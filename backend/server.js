import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import session from "express-session";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// ---------- Middlewares ----------
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, try again later" },
});
app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(mongoSanitize());
app.use(xss());
app.use(
  cors({
    origin: [
      "https://medi-meet-web-six.vercel.app",
      "https://medi-meet-admin.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    cookie: {
      sameSite: "lax",
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.disable("x-powered-by");

// ---------- Routes ----------
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
// ---------- Root Endpoint ----------
app.get("/", (_, res) => {
  res.status(200).json({ message: "Server running successfully ✅" });
});
// ---------- Not Found & Error Handler ----------
app.all("*", (req, res) => {
  logger.warn(`404 - ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use(errorHandler);
// ---------- Server ----------
app.listen(PORT, () =>
  logger.info(`🚀 Server running on http://localhost:${PORT}`)
);
