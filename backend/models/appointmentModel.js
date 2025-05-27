import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    docId: {
      type: String,
      ref: "Doctor",
      required: true,
    },
    slotDate: {
      type: String,
      required: true,
      trim: true,
    },
    slotTime: {
      type: String,
      required: true,
      trim: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    docData: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Number,
      required: true,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const appointmentModel =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;
