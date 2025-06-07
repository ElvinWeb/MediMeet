import * as yup from "yup";

export const doctorProfileValidationSchema = yup.object().shape({
  about: yup
    .string()
    .required("About section is required")
    .min(50, "About section must be at least 50 characters")
    .max(1000, "About section cannot exceed 1000 characters"),
  fees: yup
    .number()
    .typeError("Fees must be a number")
    .positive("Fees must be greater than zero")
    .required("Fees is required")
    .max(200, "Fees must be at most $200"),
  address: yup.object().shape({
    line1: yup
      .string()
      .required("Address line 1 is required")
      .min(5, "Address must be at least 5 characters"),
    line2: yup.string(),
  }),
  available: yup.boolean(),
});
