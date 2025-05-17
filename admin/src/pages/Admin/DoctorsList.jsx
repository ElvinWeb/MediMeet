import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { API_ENDPOINTS, BACKEND_URL } from "../../constants/apiEndpoints";
import axios from "axios";
import EmptyState from "../../components/EmptyState";

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } =
    useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isDoctorAvailable = !doctors || doctors.length === 0;

  // Function to delete doctor using API
  const deleteDoctor = async (doctorId) => {
    try {
      const { data } = await axios.delete(
        BACKEND_URL + API_ENDPOINTS.ADMIN.DELETE_DOCTOR(doctorId),
        {
          headers: { aToken },
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

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <>
      <div className="m-5 max-h-[90vh] overflow-y-scroll">
        <h1 className="text-lg font-medium">All Doctors</h1>
        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {isDoctorAvailable ? (
            <div className="absolute w-full h-[80vh]">
              <div className="relative flex items-center justify-center w-9/12">
                <EmptyState
                  title="No Doctors Available"
                  subtitle="Please check back later or add some doctors."
                />
              </div>
            </div>
          ) : (
            doctors.map((item) => {
              return (
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
                      <p className="text-[#5C5C5C] text-sm">
                        {item.speciality}
                      </p>
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
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"
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
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorsList;
