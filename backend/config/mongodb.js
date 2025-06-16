import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    logger.error("❌ MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    mongoose.connection.on("connected", () => {
      logger.info("✅ DB connected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("❌ DB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ DB disconnected.");
    });

    await mongoose.connect(`${MONGODB_URI}/prescripto`, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    logger.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
