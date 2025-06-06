import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";
import PageTitle from "../components/atoms/PageTitle";

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("userId", userData._id);

      image && formData.append("image", image);

      const { data } = await api.post(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <main>
      <PageTitle normalText="MY" boldText="PROFILE" />
      <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
        {isEdit ? (
          <label htmlFor="image" className="block">
            <span className="sr-only">Upload profile image</span>
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt={`Profile picture of ${userData.name}`}
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt="Upload icon"
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              aria-label="Upload new profile image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 rounded"
            src={userData.image}
            alt={`Profile picture of ${userData.name}`}
          />
        )}

        {isEdit ? (
          <div>
            <label htmlFor="user-name" className="sr-only">
              Full Name
            </label>
            <input
              id="user-name"
              className="bg-gray-50 text-3xl font-medium max-w-60"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              value={userData.name}
              aria-label="Edit full name"
            />
          </div>
        ) : (
          <p className="font-medium text-3xl text-[#262626] mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-[#ADADAD] h-[1px] border-none" />

        <section aria-labelledby="contact-info">
          <h3 id="contact-info" className="text-gray-600 underline mt-3">
            CONTACT INFORMATION
          </h3>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>

            {isEdit ? (
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  className="bg-gray-50 max-w-52"
                  type="tel"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  value={userData.phone}
                  aria-label="Edit phone number"
                />
              </div>
            ) : (
              <p className="text-blue-500">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>

            {isEdit ? (
              <div>
                <label htmlFor="address-line1" className="sr-only">
                  Address Line 1
                </label>
                <input
                  id="address-line1"
                  className="bg-gray-50 mb-1 w-full"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  aria-label="Address line 1"
                />
                <br />
                <label htmlFor="address-line2" className="sr-only">
                  Address Line 2
                </label>
                <input
                  id="address-line2"
                  className="bg-gray-50 w-full"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  aria-label="Address line 2"
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
            )}
          </div>
        </section>
        <section aria-labelledby="basic-info">
          <h3 id="basic-info" className="text-[#797979] underline mt-3">
            BASIC INFORMATION
          </h3>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
            <p className="font-medium">Gender:</p>

            {isEdit ? (
              <div>
                <label htmlFor="gender" className="sr-only">
                  Gender
                </label>
                <select
                  id="gender"
                  className="max-w-20 bg-gray-50"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                  aria-label="Select gender"
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            ) : (
              <p className="text-gray-500">{userData.gender}</p>
            )}

            <p className="font-medium">Date of Birth:</p>

            {isEdit ? (
              <div>
                <label htmlFor="dob" className="sr-only">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  className="max-w-28 bg-gray-50"
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob}
                  aria-label="Date of birth"
                />
              </div>
            ) : (
              <p className="text-gray-500">{userData.dob}</p>
            )}
          </div>
        </section>
        <div className="mt-10">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              type="button"
              aria-label="Save profile changes"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              type="button"
              aria-label="Edit profile information"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </main>
  ) : null;
};

export default MyProfile;
