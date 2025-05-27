import * as adminService from "../services/adminService.js";

export const loginAdmin = async (req, res) => {
  try {
    const result = await adminService.loginAdmin(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const appointmentsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const result = await adminService.appointmentsAdmin({ page, limit });
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const appointmentCancel = async (req, res) => {
  try {
    const result = await adminService.appointmentCancel(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addDoctor = async (req, res) => {
  try {
    const result = await adminService.addDoctor({
      ...req.body,
      imageFile: req.file,
    });
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const result = await adminService.updateDoctor({
      doctorId: req.params.doctorId,
      ...req.body,
      imageFile: req.file,
    });
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const result = await adminService.deleteDoctor({
      doctorId: req.params.doctorId,
    });
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const allDoctors = async (req, res) => {
  try {
    const result = await adminService.allDoctors();
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const result = await adminService.adminDashboard();
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
