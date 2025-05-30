import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import { generateAvailableSlots } from "../utils/appointmentUtils.js";

// Doctor login
export const loginDoctor = async ({ email, password }) => {
  const doctor = await doctorModel.findOne({ email });
  if (!doctor) {
    return { success: false, message: "Invalid credentials" };
  }
  const isMatch = await bcrypt.compare(password, doctor.password);
  if (isMatch) {
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    return { success: true, token };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};

// Get doctor appointments for doctor panel (paginated)
export const appointmentsDoctor = async ({ docId, page = 1, limit = 7 }) => {
  const skip = (page - 1) * limit;
  const totalAppointments = await appointmentModel.countDocuments({ docId });
  const appointments = await appointmentModel
    .find({ docId })
    .skip(skip)
    .limit(limit)
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

// Cancel appointment from doctor panel
export const appointmentCancel = async ({ docId, appointmentId }) => {
  const appointmentData = await appointmentModel.findById(appointmentId);
  if (appointmentData && appointmentData.docId === docId) {
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    return { success: true, message: "Appointment Cancelled" };
  }
  return { success: false, message: "Appointment Cancelled" };
};

// Mark appointment completed for doctor panel
export const appointmentComplete = async ({ docId, appointmentId }) => {
  const appointmentData = await appointmentModel.findById(appointmentId);
  if (appointmentData && appointmentData.docId === docId) {
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });
    return { success: true, message: "Appointment Completed" };
  }
  return { success: false, message: "Appointment Cancelled" };
};

// Get all doctors for frontend (without password/email)
export const doctorList = async () => {
  const doctors = await doctorModel.find({}).select(["-password", "-email"]);
  return { success: true, doctors };
};

// Change doctor availability
export const changeAvailablity = async ({ docId }) => {
  const docData = await doctorModel.findById(docId);
  await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
  return { success: true, message: "Availablity Changed" };
};

// Get doctor profile
export const doctorProfile = async ({ docId }) => {
  const profileData = await doctorModel.findById(docId).select("-password");
  return { success: true, profileData };
};

// Update doctor profile
export const updateDoctorProfile = async ({
  docId,
  fees,
  address,
  available,
}) => {
  await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
  return { success: true, message: "Profile Updated" };
};

// Get dashboard data for doctor panel
export const doctorDashboard = async ({ docId }) => {
  const doctor = await doctorModel.findById(docId);
  const appointments = await appointmentModel.find({ docId });
  let earnings = 0;
  let patients = [];

  appointments.forEach((item) => {
    if (item.isCompleted || item.payment) {
      earnings += item.amount;
    }
    if (!patients.includes(item.userId)) {
      patients.push(item.userId);
    }
  });

  const latestAppointments = appointments
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const totalSlots = generateAvailableSlots();
  const todayKey = dayjs().format("D_M_YYYY");
  const todayBookedSlots = doctor.slots_booked?.[todayKey] || [];
  const freeSlotsToday = Math.max(
    0,
    totalSlots[0].length - todayBookedSlots.length
  );

  const todayAppointments = appointments.filter(
    (app) => app.slotDate === todayKey
  );

  const dashData = {
    earnings,
    latestAppointments,
    allAppointments: appointments,
    appointmentsCount: todayAppointments.length,
    patients: patients.length,
    freeSlotsToday,
  };

  return { success: true, dashData };
};
