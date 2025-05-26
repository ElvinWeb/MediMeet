import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS, BACKEND_URL } from "../../constants/apiEndpoints";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (line, value) => {
    setProfileData((prev) => ({
      ...prev,
      address: { ...prev.address, [line]: value },
    }));
  };

  const updateProfile = useCallback(async () => {
    try {
      const { address, fees, about, available } = profileData;
      const updateData = { address, fees, about, available };

      const { data } = await axios.post(
        BACKEND_URL + API_ENDPOINTS.DOCTOR.UPDATE_PROFILE,
        updateData,
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
      toast.error(error.message);
      console.error("Update Profile Error:", error);
    }
  }, [profileData, dToken, getProfileData]);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken, getProfileData]);

  if (!profileData) return null;

  const {
    image,
    name,
    degree,
    speciality,
    experience,
    about,
    fees,
    address = {},
    available,
  } = profileData;

  return (
    <div className="flex flex-col gap-4 m-5">
      <img
        src={image}
        alt="Doctor"
        className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
      />

      <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
        <h2 className="text-3xl font-medium text-gray-700">{name}</h2>
        <div className="flex items-center gap-2 mt-1 text-gray-600">
          <p>
            {degree} - {speciality}
          </p>
          <span className="py-0.5 px-2 border text-xs rounded-full">
            {experience}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-[#262626]">About:</p>
          {isEdit ? (
            <textarea
              rows={6}
              value={about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              className="w-full outline-primary p-2 mt-1"
            />
          ) : (
            <p className="text-sm text-gray-600 mt-1">{about}</p>
          )}
        </div>

        <div className="mt-4 text-gray-600 font-medium">
          Appointment Fee:{" "}
          <span className="text-gray-800">
            {CURRENCY_SYMBOL}
            {isEdit ? (
              <input
                type="number"
                className="ml-1"
                value={fees}
                onChange={(e) => handleInputChange("fees", e.target.value)}
              />
            ) : (
              fees
            )}
          </span>
        </div>

        <div className="flex gap-2 py-2">
          <p className="font-medium">Address:</p>
          <div className="text-sm">
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={address.line1}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  className="mb-1 w-full bg-gray-50 border rounded p-1"
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  value={address.line2}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  className="w-full bg-gray-50 border rounded p-1"
                  placeholder="Address Line 2"
                />
              </>
            ) : (
              <>
                <p>{address.line1}</p>
                <p>{address.line2}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            checked={available}
            onChange={() =>
              isEdit && handleInputChange("available", !available)
            }
          />
          <label>Available</label>
        </div>

        <button
          onClick={isEdit ? updateProfile : () => setIsEdit(true)}
          className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
