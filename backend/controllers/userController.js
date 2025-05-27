import * as userService from "../services/userService.js";

// API to register user
export const registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to login user
export const loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
export const getProfile = async (req, res) => {
  try {
    const result = await userService.getProfile(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
export const updateProfile = async (req, res) => {
  try {
    const data = { ...req.body, imageFile: req.file };
    const result = await userService.updateProfile(data);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// API to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const result = await userService.bookAppointment(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const result = await userService.cancelAppointment(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
export const listAppointment = async (req, res) => {
  try {
    const result = await userService.listAppointment(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to make payment of appointment using Stripe
export const paymentStripe = async (req, res) => {
  try {
    const result = await userService.paymentStripe({
      ...req.body,
      origin: req.headers.origin,
    });
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment of appointment using Stripe
export const verifyStripe = async (req, res) => {
  try {
    const result = await userService.verifyStripe(req.body);
    res.json(result);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
