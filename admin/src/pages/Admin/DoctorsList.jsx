import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
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

  // Enhanced state management
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [specialityFilter, setSpecialityFilter] = useState("all");

  // Fetch doctors data
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

  // Get unique specialities for filter
  const availableSpecialities = useMemo(() => {
    const specialities = [
      ...new Set(doctors.map((doctor) => doctor.speciality)),
    ];
    return specialities.sort();
  }, [doctors]);

  // Enhanced delete doctor function
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

  // Enhanced filtering and sorting
  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctors.filter((doctor) => {
      // Search filter
      const searchMatch = doctor.name
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
      if (!searchMatch) return false;

      // Availability filter
      if (filterBy === "available" && !doctor.available) return false;
      if (filterBy === "unavailable" && doctor.available) return false;

      // Speciality filter
      if (specialityFilter !== "all" && doctor.speciality !== specialityFilter)
        return false;

      return true;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "speciality":
          return a.speciality.localeCompare(b.speciality);
        case "availability":
          return b.available - a.available; // Available first
        default:
          return 0;
      }
    });

    return filtered;
  }, [doctors, searchValue, filterBy, specialityFilter, sortBy]);

  // Handlers
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

  // Stats calculation
  const stats = useMemo(() => {
    const total = doctors.length;
    const available = doctors.filter((d) => d.available).length;
    const unavailable = total - available;

    return { total, available, unavailable };
  }, [doctors]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchValue) count++;
    if (filterBy !== "all") count++;
    if (specialityFilter !== "all") count++;
    return count;
  }, [searchValue, filterBy, specialityFilter]);

  return (
    <main className="max-w-7xl mx-auto p-6" role="main">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <UserGroupIcon className="w-8 h-8 text-blue-600" />
            All Doctors
          </h1>
          <p className="text-gray-600 mt-1">
            Manage doctor profiles and availability
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Stats Cards */}
          <div className="hidden sm:flex items-center gap-4 mr-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.available}
              </div>
              <div className="text-xs text-gray-500">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.unavailable}
              </div>
              <div className="text-xs text-gray-500">Unavailable</div>
            </div>
          </div>

          <button
            onClick={handleAddDoctor}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <SearchBar
              onSearchSubmit={setSearchValue}
              placeholder="Search doctors by name..."
              aria-label="Search doctors"
            />
          </div>

          {/* Availability Filter */}
          <div>
            <label
              htmlFor="availability-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Availability
            </label>
            <select
              id="availability-filter"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              <option value="all">All Doctors</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Unavailable Only</option>
            </select>
          </div>

          {/* Speciality Filter */}
          <div>
            <label
              htmlFor="speciality-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Speciality
            </label>
            <select
              id="speciality-filter"
              value={specialityFilter}
              onChange={(e) => setSpecialityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              <option value="all">All Specialities</option>
              {availableSpecialities.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 mb-3 sm:mb-0">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-500" />
              <label
                htmlFor="sort-by"
                className="text-sm font-medium text-gray-700"
              >
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              >
                <option value="name">Name</option>
                <option value="speciality">Speciality</option>
                <option value="availability">Availability</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedDoctors.length} of {doctors.length}{" "}
            doctors
            {activeFiltersCount > 0 &&
              ` (${activeFiltersCount} filters applied)`}
          </div>
        </div>

        {/* Active Filters */}
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

      {/* Content Area */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
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
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
            role="grid"
            aria-label="Doctors list"
          >
            {filteredAndSortedDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                item={doctor}
                changeAvailability={changeAvailability}
                onDeleteClick={handleDeleteClick}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
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
          title="Delete Doctor"
          message={`Are you sure you want to delete Dr. ${selectedDoctorName}? This action cannot be undone and will remove all associated data.`}
          variant="destructive"
        />,
        document.body
      )}
    </main>
  );
};

export default DoctorsList;
