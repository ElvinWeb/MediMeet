export const validateDoctorFields = (fields) => {
  const requiredFields = [
    "name",
    "email",
    "password",
    "speciality",
    "degree",
    "experience",
    "about",
    "fees",
    "address",
  ];
  return requiredFields.every((key) => fields[key]);
};
