import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// Admin Login
export const loginAdmin = async ({ email, password }) => {
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    return { success: true, token };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};

// Get all appointments with pagination
export const appointmentsAdmin = async ({ page = 1, limit = 7 }) => {
  const skip = (page - 1) * limit;
  const totalAppointments = await appointmentModel.countDocuments();

  const appointments = await appointmentModel
    .find({})
    .limit(limit)
    .skip(skip)
    .lean()
    .sort({ createdAt: -1 });

  return {
    success: true,
    appointments,
    pagination: {
      total: totalAppointments,
      currentPage: page,
      totalPages: Math.ceil(totalAppointments / limit),
      pageSize: limit,
    },
  };
};

// Appointment cancellation by admin
export const appointmentCancel = async ({ appointmentId }) => {
  await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  return { success: true, message: "Appointment Cancelled" };
};

// Add Doctor
export const addDoctor = async (data) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
    imageFile,
  } = data;

  if (
    !name ||
    !email ||
    !password ||
    !speciality ||
    !degree ||
    !experience ||
    !about ||
    !fees ||
    !address
  ) {
    return { success: false, message: "Missing Details" };
  }

  if (!validator.isEmail(email)) {
    return { success: false, message: "Please enter a valid email" };
  }

  if (password.length < 8) {
    return { success: false, message: "Please enter a strong password" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // upload image to cloudinary
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: "image",
  });
  const imageUrl = imageUpload.secure_url;

  const doctorData = {
    name,
    email,
    image: imageUrl,
    password: hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fees,
    address: JSON.parse(address),
    date: Date.now(),
  };

  const newDoctor = new doctorModel(doctorData);
  await newDoctor.save();
  return { success: true, message: "Doctor Added" };
};

// Update Doctor
export const updateDoctor = async ({ doctorId, ...updateFields }) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
    imageFile,
  } = updateFields;

  // Find the existing doctor
  const doctor = await doctorModel.findById(doctorId);
  if (!doctor) {
    return { success: false, message: "Doctor not found" };
  }

  const updatedData = {
    name,
    email,
    speciality,
    degree,
    experience,
    about,
    fees,
    address: JSON.parse(address),
  };

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedData.password = hashedPassword;
  }

  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    updatedData.image = imageUpload.secure_url;
  }

  await doctorModel.findByIdAndUpdate(doctorId, updatedData);
  return { success: true, message: "Doctor updated successfully" };
};

// Delete Doctor
export const deleteDoctor = async ({ doctorId }) => {
  const deletedDoctor = await doctorModel.findByIdAndDelete(doctorId);

  if (!deletedDoctor) {
    return { success: false, message: "Doctor not found" };
  }

  return { success: true, message: "Doctor deleted successfully" };
};

// Get all doctors for admin panel
export const allDoctors = async () => {
  const doctors = await doctorModel.find({}).select("-password");
  return { success: true, doctors };
};

// Get dashboard data for admin panel
export const adminDashboard = async () => {
  const doctors = await doctorModel.find({});
  const users = await userModel.find({});
  const appointments = await appointmentModel.find({});
  let earnings = 0;

  const latestAppointments = appointments
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  appointments.forEach((item) => {
    if (item.isCompleted || item.payment) {
      earnings += item.amount;
    }
  });

  const recentlyAddedDoctors = await doctorModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name image createdAt");

  const recentlyUpdatedDoctors = await doctorModel
    .find({ $expr: { $ne: ["$createdAt", "$updatedAt"] } })
    .sort({ updatedAt: -1 })
    .limit(5)
    .select("name image updatedAt");

  const doctorActivity = [
    ...recentlyAddedDoctors.map((doc) => ({
      name: doc.name,
      image: doc.image,
      type: "added",
      date: doc.createdAt,
    })),
    ...recentlyUpdatedDoctors.map((doc) => ({
      name: doc.name,
      image: doc.image,
      type: "updated",
      date: doc.updatedAt,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const dashData = {
    doctors: doctors.length,
    appointments: appointments.length,
    patients: users.length,
    allAppointments: appointments,
    latestAppointments,
    doctorActivity,
    earnings,
  };

  return { success: true, dashData };
};
