import * as yup from "yup";

export const doctorSubmitFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(7, "Name must be at least 7 characters")
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
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  experience: yup.string().required("Experience is required"),
  fees: yup
    .number()
    .typeError("Fees must be a number")
    .positive("Fees must be greater than zero")
    .required("Fees is required")
    .max(250, "Fees must be at most $250"),
  speciality: yup.string().required("Speciality is required"),
  degree: yup.string().required("Degree is required"),
  address1: yup.string().required("Address line 1 is required"),
  address2: yup.string().required("Address line 2 is required"),
  about: yup.string().required("About is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileExist", "Image is required", (value) => {
      return value instanceof File;
    }),
});

export const doctorUpdateFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(7, "Name must be at least 7 characters")
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
  experience: yup.string().required("Experience is required"),
  fees: yup
    .number()
    .typeError("Fees must be a number")
    .positive("Fees must be greater than zero")
    .required("Fees is required")
    .max(150, "Fees must be at most $150"),
  speciality: yup.string().required("Speciality is required"),
  degree: yup.string().required("Degree is required"),
  address1: yup.string().required("Address line 1 is required"),
  address2: yup.string().required("Address line 2 is required"),
  about: yup.string().required("About is required"),
  image: yup
    .mixed()
    .test("fileRequiredOnCreate", "Image is required", function (value) {
      const isFileList =
        value instanceof FileList ||
        (Array.isArray(value) && value[0] instanceof File);
      return !value || isFileList || typeof value === "string";
    }),
});
