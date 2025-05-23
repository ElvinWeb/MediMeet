import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import { generateAvailableSlots } from "../utils/appointmentUtils.js";

// API for doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await doctorModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const skip = (page - 1) * limit;

    const totalAppointments = await appointmentModel.countDocuments({ docId });

    const appointments = await appointmentModel
      .find({ docId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
      pagination: {
        total: totalAppointments,
        currentPage: page,
        totalPages: Math.ceil(totalAppointments / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    }

    res.json({ success: false, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    }

    res.json({ success: false, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await doctorModel.findById(docId);
    const appointments = await appointmentModel.find({ docId });
    let earnings = 0;
    let patients = [];

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    appointments.map((item) => {
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
    const freeSlotsToday = totalSlots[0].length - todayBookedSlots.length;

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

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  changeAvailablity,
  doctorDashboard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updateDoctorProfile,
};
