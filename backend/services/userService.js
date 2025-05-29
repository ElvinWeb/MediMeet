import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import stripe from "stripe";
import validator from "validator";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
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
  const userData = { name, email, password: hashedPassword };

  const newUser = new userModel(userData);
  const user = await newUser.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { success: true, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    return { success: false, message: "User does not exist" };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return { success: true, token };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};

export const getProfile = async ({ userId }) => {
  const userData = await userModel.findById(userId).select("-password");
  return { success: true, userData };
};

export const updateProfile = async ({
  name,
  phone,
  address,
  gender,
  dob,
  userId,
  imageFile,
}) => {
  const parsedAddress =
    typeof address === "string" ? JSON.parse(address) : address;

  if (!name || !phone || !dob || !gender || !address) {
    return { success: false, message: "Data Missing" };
  }

  const updateData = { name, phone, address: parsedAddress, gender, dob };
  const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;
    await userModel.findByIdAndUpdate(userId, { image: imageURL });
  }

  return {
    success: true,
    message: "User profile updated successfully",
    updatedUser,
  };
};

export const bookAppointment = async ({
  userId,
  docId,
  slotDate,
  slotTime,
}) => {
  const docData = await doctorModel.findById(docId).select("-password");
  if (!docData.available) {
    return { success: false, message: "Doctor Not Available" };
  }
  let slots_booked = docData.slots_booked;

  if (slots_booked[slotDate]) {
    if (slots_booked[slotDate].includes(slotTime)) {
      return { success: false, message: "Slot Not Available" };
    } else {
      slots_booked[slotDate].push(slotTime);
    }
  } else {
    slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);
  }

  const userData = await userModel.findById(userId).select("-password");
  delete docData.slots_booked;

  const appointmentData = {
    userId,
    docId,
    userData,
    docData,
    amount: docData.fees,
    slotTime,
    slotDate,
    date: Date.now(),
  };

  const newAppointment = new appointmentModel(appointmentData);
  await newAppointment.save();

  await doctorModel.findByIdAndUpdate(docId, { slots_booked });

  return { success: true, message: "Appointment Booked" };
};

export const cancelAppointment = async ({ userId, appointmentId }) => {
  const appointmentData = await appointmentModel.findById(appointmentId);

  if (appointmentData.userId !== userId) {
    return { success: false, message: "Unauthorized action" };
  }

  await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

  const { docId, slotDate, slotTime } = appointmentData;
  const doctorData = await doctorModel.findById(docId);

  let slots_booked = doctorData.slots_booked;
  slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);

  await doctorModel.findByIdAndUpdate(docId, { slots_booked });

  return { success: true, message: "Appointment Cancelled" };
};

export const listAppointment = async ({ userId }) => {
  const appointments = await appointmentModel.find({ userId });
  return { success: true, appointments };
};

export const paymentStripe = async ({ appointmentId, origin }) => {
  const appointmentData = await appointmentModel.findById(appointmentId);

  if (!appointmentData || appointmentData.cancelled) {
    return {
      success: false,
      message: "Appointment Cancelled or not found",
    };
  }
  const currency = process.env.CURRENCY.toLocaleLowerCase();
  const line_items = [
    {
      price_data: {
        currency,
        product_data: {
          name: "Appointment Fees",
        },
        unit_amount: appointmentData.amount * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripeInstance.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
    cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
    line_items: line_items,
    mode: "payment",
  });

  return { success: true, session_url: session.url };
};

export const verifyStripe = async ({ appointmentId, success }) => {
  if (success === "true") {
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      payment: true,
    });
    return { success: true, message: "Payment Successful" };
  }
  return { success: false, message: "Payment Failed" };
};
