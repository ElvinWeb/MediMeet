import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7; // Default limit is now 7
    const skip = (page - 1) * limit;

    const totalAppointments = await appointmentModel.countDocuments();

    const appointments = await appointmentModel
      .find({})
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

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
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
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
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
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
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
    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update an existing doctor
const updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
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
    } = req.body;
    const imageFile = req.file;

    // Find the existing doctor
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Prepare updated fields
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

    // Update password if it's changed
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedData.password = hashedPassword;
    }

    // Upload new image to Cloudinary if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updatedData.image = imageUpload.secure_url;
    }

    // Perform the update
    await doctorModel.findByIdAndUpdate(doctorId, updatedData);

    res.json({ success: true, message: "Doctor updated successfully" });
  } catch (error) {
    console.log("Update Doctor Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to delete a doctor by ID
const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const deletedDoctor = await doctorModel.findByIdAndDelete(doctorId);

    if (!deletedDoctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
    let earnings = 0;

    const latestAppointments = appointments
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    appointments.map((item) => {
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

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  allDoctors,
  adminDashboard,
};
