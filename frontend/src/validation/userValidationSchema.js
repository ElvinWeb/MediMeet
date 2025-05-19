import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(6, "Name must be at least 6 characters")
    .max(30, "Name must be at most 30 characters")
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
    )
    .max(30, "Email must be at most 30 characters")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
    )
    .max(30, "Email must be at most 30 characters")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
