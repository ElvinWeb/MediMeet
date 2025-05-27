import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    image: {
      type: String,
      required: [true, "Profile image is required"],
    },
    speciality: {
      type: String,
      required: [true, "Speciality is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
    },
    about: {
      type: String,
      required: [true, "About section is required"],
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    fees: {
      type: Number,
      required: [true, "Consultation fees are required"],
      min: 0,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    address: {
      type: Object,
      required: [true, "Address is required"],
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    minimize: false,
    timestamps: true,
  },
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default doctorModel;
