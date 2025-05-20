import mongoose from "mongoose";

const connectDB = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("❌ MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ DB connected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ DB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ DB disconnected.");
    });

    await mongoose.connect(`${MONGODB_URI}/prescripto`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
