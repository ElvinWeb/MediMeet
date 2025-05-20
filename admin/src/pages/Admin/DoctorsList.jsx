import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import EmptyState from "../../components/EmptyState";
import SearchBar from "../../components/SearchBar";
import { API_ENDPOINTS, BACKEND_URL } from "../../constants/apiEndpoints";
import { AdminContext } from "../../context/AdminContext";
const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } =
    useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const isDoctorAvailable = !doctors || doctors.length === 0;

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  const deleteDoctor = async (doctorId) => {
    try {
      const { data } = await axios.delete(
        BACKEND_URL + API_ENDPOINTS.ADMIN.DELETE_DOCTOR(doctorId),
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const doctorName = doctor.name.toLowerCase();
    return doctorName.includes(searchValue.trim().toLowerCase());
  });

  const handleResetSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-3">All Doctors</h1>

      <SearchBar onSearchSubmit={setSearchValue} />

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {isDoctorAvailable ? (
          <div className="w-full min-h-[60vh] flex justify-center items-center">
            <EmptyState
              title="No Doctors Available"
              subtitle="Please check back later or try different filters."
            />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full min-h-[60vh] mx-auto">
            <EmptyState
              title="No Matches Found"
              subtitle="We couldn't find any doctors matching your search."
            />
            <button
              onClick={handleResetSearch}
              className="px-5 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-all"
            >
              Show All Doctors
            </button>
          </div>
        ) : (
          filteredDoctors.map((item) => (
            <div key={item._id}>
              <div className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group">
                <img
                  className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500"
                  src={item.image}
                  alt=""
                  onClick={() =>
                    navigate("/doctor-details", {
                      state: { doctor: item },
                    })
                  }
                />
                <div className="p-4">
                  <p className="text-[#262626] text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
                  <div className="my-2 flex items-center gap-1 text-sm">
                    <input
                      onChange={() => changeAvailability(item._id)}
                      type="checkbox"
                      checked={item.available}
                    />
                    <p>Available</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/update-doctor", {
                        state: { doctor: item },
                      })
                    }
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Update
                  </button>
                </div>
              </div>

              {createPortal(
                <ConfirmationModal
                  onConfirm={() => {
                    deleteDoctor(item._id);
                    setShowModal(false);
                  }}
                  onCancel={() => setShowModal(false)}
                  isOpen={showModal}
                  actionType={"delete"}
                />,
                document.body
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
