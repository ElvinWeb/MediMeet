import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import PageTitle from "../components/atoms/PageTitle";
import SEOHelmet from "../components/SEO/SEOHelmet";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateUserProfileData = async () => {
    setIsUpdating(true);

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
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setImage(false);
    loadUserProfileData();
  };

  return userData ? (
    <>
      <SEOHelmet
        title="My Profile MediMeet"
        description="Manage your personal profile information with MediMeet. Update contact details, medical information, and account preferences for better healthcare experience."
        keywords="my profile, patient profile, personal information, account settings, healthcare profile"
      />

      <main id="main-content" tabIndex="-1">
        <PageTitle normalText="MY" boldText="PROFILE" />

        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {isEdit && "Profile editing mode enabled"}
          {isUpdating && "Updating profile information"}
        </div>

        <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
          <section aria-labelledby="profile-image-heading">
            <h2 id="profile-image-heading" className="sr-only">
              Profile Image
            </h2>

            {isEdit ? (
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <div className="inline-block relative cursor-pointer group">
                  <img
                    className="w-36 rounded transition-opacity group-hover:opacity-75"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt={`Profile picture of ${userData.name}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      className="w-10 opacity-70"
                      src={assets.upload_icon}
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-0 right-0 text-xs text-center text-gray-700">
                    Click to change
                  </div>
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  aria-describedby="image-help"
                  className="sr-only"
                />
                <p id="image-help" className="text-xs text-gray-600 mt-2">
                  Supported formats: JPEG, PNG, GIF. Maximum size: 5MB.
                </p>
              </div>
            ) : (
              <img
                className="w-36 rounded"
                src={userData.image}
                alt={`Profile picture of ${userData.name}`}
              />
            )}
          </section>

          <section aria-labelledby="name-heading">
            <h2 id="name-heading" className="sr-only">
              Name
            </h2>

            {isEdit ? (
              <div className="mt-4">
                <label
                  htmlFor="user-name"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Full Name{" "}
                  <span className="text-red-500" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  id="user-name"
                  className="bg-gray-50 text-3xl font-medium max-w-60 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  value={userData.name}
                  aria-describedby="name-help"
                  required
                />
                <p id="name-help" className="text-xs text-gray-600 mt-1">
                  Enter your full legal name
                </p>
              </div>
            ) : (
              <h1 className="font-medium text-3xl text-gray-800 mt-4">
                {userData.name}
              </h1>
            )}
          </section>

          <hr
            className="bg-gray-400 h-[1px] border-none my-4"
            role="separator"
          />

          <section aria-labelledby="contact-info">
            <h2
              id="contact-info"
              className="text-gray-700 underline mt-3 text-base font-semibold"
            >
              CONTACT INFORMATION
            </h2>
            <dl className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-700">
              <dt className="font-medium">Email:</dt>
              <dd className="text-blue-600">{userData.email}</dd>

              <dt className="font-medium">Phone:</dt>
              <dd>
                {isEdit ? (
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      className="bg-gray-50 max-w-52 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      type="tel"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      value={userData.phone}
                      aria-describedby="phone-help"
                      placeholder="Enter phone number"
                    />
                    <p id="phone-help" className="text-xs text-gray-600 mt-1">
                      Include country code if applicable
                    </p>
                  </div>
                ) : (
                  <span className="text-blue-600">
                    {userData.phone || "Not provided"}
                  </span>
                )}
              </dd>

              <dt className="font-medium">Address:</dt>
              <dd>
                {isEdit ? (
                  <fieldset>
                    <legend className="sr-only">Address Information</legend>
                    <div>
                      <label
                        htmlFor="address-line1"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Address Line 1
                      </label>
                      <input
                        id="address-line1"
                        className="bg-gray-50 mb-2 w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        type="text"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        value={userData.address?.line1 || ""}
                        placeholder="Street address"
                      />

                      <label
                        htmlFor="address-line2"
                        className="block text-sm font-medium mb-1 text-gray-700"
                      >
                        Address Line 2{" "}
                        <span className="text-gray-600">(Optional)</span>
                      </label>
                      <input
                        id="address-line2"
                        className="bg-gray-50 w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        type="text"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        value={userData.address?.line2 || ""}
                        placeholder="Apartment, suite, etc."
                      />
                    </div>
                  </fieldset>
                ) : (
                  <address className="text-gray-600 not-italic">
                    {userData.address?.line1 && (
                      <>
                        {userData.address.line1} <br />
                        {userData.address?.line2}
                      </>
                    )}
                    {!userData.address?.line1 && "Not provided"}
                  </address>
                )}
              </dd>
            </dl>
          </section>

          <section aria-labelledby="basic-info">
            <h2
              id="basic-info"
              className="text-gray-700 underline mt-6 text-base font-semibold"
            >
              BASIC INFORMATION
            </h2>
            <dl className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-700">
              <dt className="font-medium">Gender:</dt>
              <dd>
                {isEdit ? (
                  <div>
                    <label htmlFor="gender" className="sr-only">
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="max-w-32 bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      value={userData.gender || "Not Selected"}
                    >
                      <option value="Not Selected">Not Selected</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                ) : (
                  <span className="text-gray-600">
                    {userData.gender || "Not specified"}
                  </span>
                )}
              </dd>

              <dt className="font-medium">Date of Birth:</dt>
              <dd>
                {isEdit ? (
                  <div>
                    <label htmlFor="dob" className="sr-only">
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      className="max-w-36 bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      type="date"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                      value={userData.dob || ""}
                      max={new Date().toISOString().split("T")[0]}
                      aria-describedby="dob-help"
                    />
                    <p id="dob-help" className="text-xs text-gray-600 mt-1">
                      This helps us provide age-appropriate care
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-600">
                    {userData.dob || "Not provided"}
                  </span>
                )}
              </dd>
            </dl>
          </section>

          <section aria-labelledby="profile-actions" className="mt-10">
            <h2 id="profile-actions" className="sr-only">
              Profile Actions
            </h2>

            <div className="flex gap-4">
              {isEdit ? (
                <>
                  <button
                    onClick={updateUserProfileData}
                    disabled={isUpdating}
                    className={`border border-blue-600 px-8 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${
                      isUpdating
                        ? "bg-gray-300 cursor-not-allowed border-gray-300"
                        : "hover:bg-blue-600 hover:text-white"
                    }`}
                    type="button"
                    aria-describedby="save-status"
                  >
                    {isUpdating ? "Saving..." : "Save information"}
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                    className="border border-gray-500 text-gray-700 px-8 py-2 rounded-full hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
                    type="button"
                    aria-label="Cancel editing and discard changes"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  type="button"
                  aria-describedby="edit-help"
                >
                  Edit
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  ) : null;
};

export default MyProfile;
