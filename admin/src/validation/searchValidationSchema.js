import * as yup from "yup";

export const searchValidationSchema = yup.object().shape({
  search: yup
    .string()
    .required("Search is required")
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
    .min(3, "Search must be at least 3 characters")
    .max(30, "Search must be at most 30 characters"),
});
