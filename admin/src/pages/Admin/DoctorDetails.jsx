import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { SPEACIALITY_LIST } from "../../constants/specialityConstants";
import { EXPERIENCE_OPTIONS } from "../../constants/yearsConstants";
const DoctorDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctorData = useMemo(() => state.doctor || {}, [state.doctor]);

  const { register, setValue } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      experience: "1 Year",
      fees: "",
      speciality: "General physician",
      degree: "",
      address1: "",
      address2: "",
      about: "",
    },
  });

  useEffect(() => {
    if (doctorData) {
      setValue("name", doctorData.name);
      setValue("email", doctorData.email);
      setValue("experience", doctorData.experience);
      setValue("fees", doctorData.fees);
      setValue("speciality", doctorData.speciality);
      setValue("degree", doctorData.degree);
      setValue("about", doctorData.about);
      setValue("address1", doctorData.address?.line1 || "");
      setValue("address2", doctorData.address?.line2 || "");
    }
  }, [doctorData, setValue]);

  return (
    <div className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Doctor Details</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 rounded-full cursor-pointer object-cover border"
              src={doctorData.image || assets.upload_area}
              alt="doctor"
            />
          </label>
          <input
            {...register("image")}
            type="file"
            id="doc-img"
            hidden
            disabled
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Your name</p>
              <input
                {...register("name")}
                placeholder="Name"
                className="border rounded px-3 py-2"
                disabled
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2"
                disabled
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                {...register("password")}
                type="password"
                placeholder="New Password"
                className="border rounded px-3 py-2"
                disabled
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                {...register("experience")}
                className="border rounded px-3 py-2"
                disabled
              >
                {EXPERIENCE_OPTIONS.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                {...register("fees")}
                type="number"
                placeholder="Doctor Fees"
                className="border rounded px-3 py-2"
                disabled
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                {...register("speciality")}
                className="border rounded px-3 py-2"
                disabled
              >
                {SPEACIALITY_LIST.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Degree</p>
              <input
                {...register("degree")}
                placeholder="Degree"
                className="border rounded px-3 py-2"
                disabled
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Address</p>
              <input
                {...register("address1")}
                placeholder="Address 1"
                className="border rounded px-3 py-2"
                disabled
              />

              <input
                {...register("address2")}
                placeholder="Address 2"
                className="border rounded px-3 py-2"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2">About Doctor</p>
          <textarea
            {...register("about")}
            rows={5}
            placeholder="Write about doctor"
            className="w-full border rounded px-4 pt-2"
            disabled
          />
        </div>
        <button
          onClick={() => navigate("/doctor-list")}
          className="border-primary border-2 px-10 py-3 mt-4 text-primary rounded-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DoctorDetails;
