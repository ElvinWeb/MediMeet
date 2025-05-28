import axios from "axios";
import { useContext, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/molecules/ConfirmationModal";
import EmptyState from "../../components/atoms/EmptyState";
import DoctorCard from "../../components/molecules/DoctorCard";
import SearchBar from "../../components/molecules/SearchBar";
import { API_ENDPOINTS, BACKEND_URL } from "../../constants/apiEndpoints";
import { AdminContext } from "../../context/AdminContext";
import MiniLoadingSpinner from "../../components/atoms/MiniLoadingSpinner";
const DoctorsList = () => {
  const {
    doctors,
    changeAvailability,
    aToken,
    getAllDoctors,
    isDoctorAvailable,
  } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (aToken) {
        setIsLoading(true);
        try {
          await getAllDoctors();
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
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

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }, [doctors, searchValue]);

  const handleResetSearch = () => {
    setSearchValue("");
  };

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowModal(true);
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-3">All Doctors</h1>

      <SearchBar onSearchSubmit={setSearchValue} />

      <div className="w-full flex flex-wrap gap-3 pt-5 gap-y-6">
        {isLoading ? (
          <MiniLoadingSpinner />
        ) : isDoctorAvailable ? (
          <div className="w-full min-h-[60vh] flex justify-center items-center">
            <EmptyState
              title="No Doctors Available"
              subtitle="When doctors are made, they’ll appear here."
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
              <DoctorCard
                key={item._id}
                setShowModal={() => handleDeleteClick(item._id)}
                item={item}
                changeAvailability={changeAvailability}
              />
            </div>
          ))
        )}
      </div>
      {createPortal(
        <ConfirmationModal
          onConfirm={() => {
            deleteDoctor(selectedDoctorId);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
          isOpen={showModal}
          actionType={"delete"}
        />,
        document.body
      )}
    </div>
  );
};

export default DoctorsList;
