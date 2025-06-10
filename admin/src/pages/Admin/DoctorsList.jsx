import { PlusIcon } from "@heroicons/react/24/outline";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DoctorCardSkeleton from "../../components/atoms/DoctorCardSkeleton";
import EmptyState from "../../components/atoms/EmptyState";
import ConfirmationModal from "../../components/molecules/ConfirmationModal";
import DoctorCard from "../../components/molecules/DoctorCard";
import SearchBar from "../../components/molecules/SearchBar";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { AdminContext } from "../../context/AdminContext";
import api from "../../utils/api";

const DoctorsList = () => {
  const navigate = useNavigate();
  const {
    doctors,
    changeAvailability,
    aToken,
    getAllDoctors,
    isDoctorAvailable,
  } = useContext(AdminContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [specialityFilter, setSpecialityFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      if (aToken) {
        setIsLoading(true);
        try {
          await getAllDoctors();
        } catch (error) {
          console.error("Failed to fetch doctors:", error);
          toast.error("Failed to fetch doctors. Please try again later!");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [aToken, getAllDoctors]);

  const availableSpecialities = useMemo(() => {
    const specialities = [
      ...new Set(doctors.map((doctor) => doctor.speciality)),
    ];
    return specialities.sort();
  }, [doctors]);

  const deleteDoctor = async (doctorId) => {
    setIsDeleting(true);
    try {
      const { data } = await api.delete(
        API_ENDPOINTS.ADMIN.DELETE_DOCTOR(doctorId),
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
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete doctor");
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setSelectedDoctorId(null);
      setSelectedDoctorName("");
    }
  };

  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctors.filter((doctor) => {
      const searchMatch = doctor.name
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
      if (!searchMatch) return false;

      if (filterBy === "available" && !doctor.available) return false;
      if (filterBy === "unavailable" && doctor.available) return false;

      if (specialityFilter !== "all" && doctor.speciality !== specialityFilter)
        return false;

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "speciality":
          return a.speciality.localeCompare(b.speciality);
        case "availability":
          return b.available - a.available;
        default:
          return 0;
      }
    });

    return filtered;
  }, [doctors, searchValue, filterBy, specialityFilter, sortBy]);

  const handleResetFilters = useCallback(() => {
    setSearchValue("");
    setFilterBy("all");
    setSpecialityFilter("all");
    setSortBy("name");
  }, []);

  const handleDeleteClick = useCallback((doctorId, doctorName) => {
    setSelectedDoctorId(doctorId);
    setSelectedDoctorName(doctorName);
    setShowModal(true);
  }, []);

  const handleAddDoctor = useCallback(() => {
    navigate("/add-doctor");
  }, [navigate]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchValue) count++;
    if (filterBy !== "all") count++;
    if (specialityFilter !== "all") count++;
    return count;
  }, [searchValue, filterBy, specialityFilter]);

  return (
    <main className="max-w-7xl mx-auto p-6" role="main">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            All Doctors
          </h1>
          <p className="text-gray-600 mt-1">
            Manage doctor profiles and availability
          </p>
        </div>

        <button
          onClick={handleAddDoctor}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Add Doctor
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="w-full lg:flex-row flex justify-between items-center">
          <SearchBar
            onSearchSubmit={setSearchValue}
            placeholder="Search doctors by name..."
            aria-label="Search doctors"
          />
          <select
            id="speciality-filter"
            value={specialityFilter}
            onChange={(e) => setSpecialityFilter(e.target.value)}
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="all">All Specialities</option>
            {availableSpecialities.map((speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchValue && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                Search: "{searchValue}"
                <button
                  onClick={() => setSearchValue("")}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                  aria-label="Remove search filter"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}
            {filterBy !== "all" && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                Status: {filterBy}
                <button
                  onClick={() => setFilterBy("all")}
                  className="hover:bg-green-200 rounded-full p-0.5"
                  aria-label="Remove status filter"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}
            {specialityFilter !== "all" && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                Speciality: {specialityFilter}
                <button
                  onClick={() => setSpecialityFilter("all")}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                  aria-label="Remove speciality filter"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))}
          </div>
        ) : isDoctorAvailable ? (
          <div className="flex flex-col items-center justify-center py-16">
            <EmptyState
              title="No Doctors Available"
              subtitle="Get started by adding your first doctor to the system."
            />
            <button
              onClick={handleAddDoctor}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add First Doctor
            </button>
          </div>
        ) : filteredAndSortedDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <EmptyState
              title="No Matches Found"
              subtitle="We couldn't find any doctors matching your search criteria."
            />
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-3 bg-primary text-white rounded-lg"
            >
              Show All Doctors
            </button>
          </div>
        ) : (
          <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            role="grid"
            aria-label="Doctors list"
          >
            {filteredAndSortedDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                item={doctor}
                changeAvailability={changeAvailability}
                onDeleteClick={() => handleDeleteClick(doctor._id, doctor.name)}
              />
            ))}
          </div>
        )}
      </div>

      {createPortal(
        <ConfirmationModal
          onConfirm={() => deleteDoctor(selectedDoctorId)}
          onCancel={() => {
            setShowModal(false);
            setSelectedDoctorId(null);
            setSelectedDoctorName("");
          }}
          isOpen={showModal}
          isLoading={isDeleting}
          actionType="delete"
          message={`Are you sure you want to delete Dr. ${selectedDoctorName}? This action cannot be undone and will remove all associated data.`}
        />,
        document.body
      )}
    </main>
  );
};

export default DoctorsList;
