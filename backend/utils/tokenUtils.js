import jwt from "jsonwebtoken";

export const generateToken = (key) =>
  jwt.sign({ key }, process.env.JWT_SECRET, { expiresIn: "2d" });
