import * as doctorService from "../services/doctorService.js";

// Doctor login
export const loginDoctor = async (req, res) => {
  try {
    const result = await doctorService.loginDoctor(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get doctor appointments (paginated)
export const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const result = await doctorService.appointmentsDoctor({
      docId,
      page,
      limit,
    });
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Cancel appointment
export const appointmentCancel = async (req, res) => {
  try {
    const result = await doctorService.appointmentCancel(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Complete appointment
export const appointmentComplete = async (req, res) => {
  try {
    const result = await doctorService.appointmentComplete(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all doctors
export const doctorList = async (req, res) => {
  try {
    const result = await doctorService.doctorList();
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change availability
export const changeAvailablity = async (req, res) => {
  try {
    const result = await doctorService.changeAvailablity(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get doctor profile
export const doctorProfile = async (req, res) => {
  try {
    const result = await doctorService.doctorProfile(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update doctor profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const result = await doctorService.updateDoctorProfile(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get dashboard data
export const doctorDashboard = async (req, res) => {
  try {
    const result = await doctorService.doctorDashboard(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
