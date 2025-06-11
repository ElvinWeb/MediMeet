import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { API_ENDPOINTS, BACKEND_URL } from "../../constants/apiEndpoints";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { DoctorContext } from "../../context/DoctorContext";
import { doctorProfileValidationSchema } from "../../validation/doctorProfileValidationSchema";
import { assets } from "../../assets/assets";

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(doctorProfileValidationSchema),
    mode: "onChange",
    defaultValues: {
      about: "",
      fees: "",
      address: {
        line1: "",
        line2: "",
      },
      available: false,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.DOCTOR.UPDATE_PROFILE,
        formData,
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
      console.error("Update Profile Error:", error);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    if (profileData && Object.keys(profileData).length > 0) {
      const formData = {
        about: profileData.about || "",
        fees: profileData.fees || "",
        address: {
          line1: profileData.address?.line1 || "",
          line2: profileData.address?.line2 || "",
        },
        available: profileData.available || false,
      };
      reset(formData);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    if (profileData && Object.keys(profileData).length > 0) {
      const formData = {
        about: profileData.about || "",
        fees: profileData.fees || "",
        address: {
          line1: profileData.address?.line1 || "",
          line2: profileData.address?.line2 || "",
        },
        available: profileData.available || false,
      };
      reset(formData);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken, getProfileData]);

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      const formData = {
        about: profileData.about || "",
        fees: profileData.fees || "",
        address: {
          line1: profileData.address?.line1 || "",
          line2: profileData.address?.line2 || "",
        },
        available: profileData.available || false,
      };
      reset(formData);
    }
  }, [profileData, reset]);

  const {
    image = "",
    name = "",
    degree = "",
    speciality = "",
    experience = "",
    about = "",
    fees = "",
    address = { line1: "", line2: "" },
    available = false,
  } = profileData || {};

  return (
    <>
      <main id="main-content" className="max-w-6xl mx-auto p-6" tabIndex="-1">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {isEdit && "Profile editing mode enabled"}
          {isSubmitting && "Updating profile information"}
        </div>

        <div className="mb-4 lg:mb-4">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            Doctor Profile
          </h1>
          <p className="text-gray-600 mt-1">
            Manage doctor personal information
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={image || assets.upload_area}
                    alt={`Professional photo of Dr. ${name}`}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div
                    className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                      isEdit
                        ? watchedValues.available
                          ? "bg-green-500"
                          : "bg-gray-400"
                        : available
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                    title={
                      isEdit
                        ? watchedValues.available
                          ? "Available"
                          : "Unavailable"
                        : available
                        ? "Available"
                        : "Unavailable"
                    }
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Dr. {name}
                  </h2>
                  <p className="text-primary font-medium">{speciality}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {degree}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {experience}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    About
                  </h3>
                  {isEdit ? (
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Professional Summary{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register("about")}
                        id="about"
                        rows={4}
                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                          errors.about
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Describe your medical expertise, specializations, and experience..."
                        aria-describedby={
                          errors.about ? "about-error" : "about-help"
                        }
                      />
                      {errors.about && (
                        <p
                          id="about-error"
                          className="text-red-600 text-sm mt-1"
                          role="alert"
                        >
                          {errors.about.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {about || "No information provided"}
                    </p>
                  )}
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    Consultation Fee
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      {CURRENCY_SYMBOL}
                    </span>
                    {isEdit ? (
                      <div className="flex-1">
                        <label htmlFor="fees" className="sr-only">
                          Consultation fee amount
                        </label>
                        <input
                          {...register("fees")}
                          id="fees"
                          type="number"
                          min="1"
                          max="10000"
                          step="0.01"
                          className={`text-2xl font-bold bg-transparent border-b-2 focus:border-primary outline-none transition-colors w-32 ${
                            errors.fees ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="0.00"
                          aria-describedby={
                            errors.fees ? "fees-error" : "fees-help"
                          }
                        />
                        {errors.fees && (
                          <p
                            id="fees-error"
                            className="text-red-600 text-sm mt-1"
                            role="alert"
                          >
                            {errors.fees.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">
                        {fees || "0"}
                      </span>
                    )}
                  </div>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Clinic Address
                  </h3>
                  {isEdit ? (
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="address.line1"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("address.line1")}
                          id="address.line1"
                          type="text"
                          className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                            errors.address?.line1
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Street address, building number"
                          aria-describedby={
                            errors.address?.line1
                              ? "address-line1-error"
                              : undefined
                          }
                        />
                        {errors.address?.line1 && (
                          <p
                            id="address-line1-error"
                            className="text-red-600 text-sm mt-1"
                            role="alert"
                          >
                            {errors.address.line1.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="address.line2"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Address Line 2{" "}
                          <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          {...register("address.line2")}
                          id="address.line2"
                          type="text"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          placeholder="Apartment, suite, floor"
                        />
                      </div>
                    </div>
                  ) : (
                    <address className="not-italic bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        {address.line1 || "No address provided"}
                      </p>
                      {address.line2 && (
                        <p className="text-gray-700">{address.line2}</p>
                      )}
                    </address>
                  )}
                </section>

                <section className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Availability Status
                  </h3>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="availability"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        {...register("available")}
                        id="availability"
                        type="checkbox"
                        disabled={!isEdit}
                        className="sr-only"
                      />
                      <div
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                          isEdit
                            ? watchedValues.available
                              ? "bg-green-500"
                              : "bg-gray-300"
                            : available
                            ? "bg-green-500"
                            : "bg-gray-300"
                        } ${isEdit ? "cursor-pointer" : "cursor-not-allowed"}`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                            isEdit
                              ? watchedValues.available
                                ? "translate-x-6"
                                : "translate-x-0"
                              : available
                              ? "translate-x-6"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                      <span
                        className={`ml-3 font-medium ${
                          isEdit
                            ? watchedValues.available
                              ? "text-green-700"
                              : "text-gray-500"
                            : available
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        {isEdit
                          ? watchedValues.available
                            ? "Available for appointments"
                            : "Currently unavailable"
                          : available
                          ? "Available for appointments"
                          : "Currently unavailable"}
                      </span>
                    </label>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    {isEdit
                      ? watchedValues.available
                        ? "Patients can book appointments with you"
                        : "You won't receive new appointment requests"
                      : available
                      ? "Patients can book appointments with you"
                      : "You won't receive new appointment requests"}
                  </p>
                </section>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  {isEdit ? (
                    <>
                      <button
                        type="submit"
                        disabled={isSubmitting || !isDirty}
                        className={`py-3 px-6 rounded-lg font-medium transition-all focus:outline-none ${
                          isSubmitting || !isDirty
                            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                            : "bg-primary text-white hover:scale-105"
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            Saving...
                          </span>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all focus:outline-none"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:scale-105 transition-all focus:outline-none"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DoctorProfile;
