import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { SPEACIALITY_LIST } from "../../constants/specialityConstants";
import { EXPERIENCE_OPTIONS } from "../../constants/yearsConstants";
import { AdminContext } from "../../context/AdminContext";
import api from "../../utils/api";
import { doctorSubmitFormValidationSchema } from "../../validation/doctorValidationSchema";

const AddDoctor = () => {
  const { aToken } = useContext(AdminContext);
  const [previewImg, setPreviewImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(doctorSubmitFormValidationSchema),
    defaultValues: {
      experience: "1 Year",
      speciality: "General physician",
    },
    mode: "all",
  });

  const onSubmitHandler = async (data) => {
    if (!previewImg) {
      toast.error("Please upload a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", previewImg);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("experience", data.experience);
    formData.append("fees", data.fees);
    formData.append("about", data.about);
    formData.append("speciality", data.speciality);
    formData.append("degree", data.degree);
    formData.append(
      "address",
      JSON.stringify({ line1: data.address1, line2: data.address2 })
    );

    try {
      const res = await api.post(API_ENDPOINTS.ADMIN.ADD_DOCTOR, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${aToken}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setPreviewImg(null);
        reset();
        navigate("/doctor-list");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (previewImg) {
      const objectUrl = URL.createObjectURL(previewImg);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [previewImg]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className={`w-16 bg-gray-100 rounded-full cursor-pointer ${
                errors.image && "border-2 border-red-500"
              }`}
              src={previewUrl || assets.upload_area}
              alt="doctor profile"
              loading="lazy"
            />
          </label>
          <input
            id="doc-img"
            type="file"
            {...register("image")}
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPreviewImg(file);
                setValue("image", file);
                clearErrors("image");
              }
            }}
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                {...register("name")}
                className="border rounded px-3 py-2"
                placeholder="Name"
                type="text"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                {...register("email")}
                className="border rounded px-3 py-2"
                placeholder="Email"
                type="email"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Set Password</p>
              <input
                {...register("password")}
                className="border rounded px-3 py-2"
                placeholder="Password"
                type="password"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                {...register("experience")}
                className="border rounded px-2 py-2"
              >
                {EXPERIENCE_OPTIONS.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <p className="text-sm text-red-500">
                {errors.experience?.message}
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                {...register("fees")}
                className="border rounded px-3 py-2"
                placeholder="Doctor fees"
                type="number"
              />
              <p className="text-red-500 text-sm">{errors.fees?.message}</p>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                {...register("speciality")}
                className="border rounded px-2 py-2"
              >
                {SPEACIALITY_LIST.map((speciality, index) => (
                  <option key={index} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-sm">
                {errors.speciality?.message}
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Degree</p>
              <input
                {...register("degree")}
                className="border rounded px-3 py-2"
                placeholder="Degree"
              />
              <p className="text-red-500 text-sm">{errors.degree?.message}</p>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                {...register("address1")}
                className="border rounded px-3 py-2"
                placeholder="Address 1"
              />
              <p className="text-red-500 text-sm">{errors.address1?.message}</p>
              <input
                {...register("address2")}
                className="border rounded px-3 py-2"
                placeholder="Address 2"
              />
              <p className="text-red-500 text-sm">{errors.address2?.message}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            {...register("about")}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about doctor"
            rows={5}
          />
          <p className="text-red-500 text-sm">{errors.about?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full mr-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Add doctor"
          )}
        </button>

        <button
          onClick={() => navigate("/doctor-list")}
          className="border-primary border-2 px-10 py-3 mt-4 text-primary rounded-full"
          disabled={isSubmitting}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
