import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

import EmptyState from "../../components/atoms/EmptyState";
import SearchBar from "../../components/molecules/SearchBar";
import TablePagination from "../../components/molecules/TablePagination";
import AdminTableRow from "../../components/molecules/AdminTableRow";
import MiniLoadingSpinner from "../../components/atoms/MiniLoadingSpinner";
import { AdminContext } from "../../context/AdminContext";
import {
  ITEMS_PER_PAGE,
  SORT_ORDERS,
  INITIAL_CURRENT_PAGE,
} from "../../constants/tableConstants";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const AdminAppointments = () => {
  const {
    aToken,
    appointments,
    cancelAppointment,
    getAllAppointments,
    isAppoinmentAvailable,
    totalAppointments,
  } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [feesSortOrder, setFeesSortOrder] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState("all");

  const fetchAppointments = useCallback(async () => {
    if (!aToken) return;

    try {
      await getAllAppointments(currentPage, ITEMS_PER_PAGE);
    } catch (error) {
      toast.error("Failed to fetch appointments. Please try again later!");
    } finally {
      setIsLoading(false);
    }
  }, [aToken, currentPage, getAllAppointments]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const availableDoctors = useMemo(() => {
    const doctors = appointments.reduce((acc, appointment) => {
      if (
        appointment.docData &&
        !acc.find((doc) => doc._id === appointment.docData._id)
      ) {
        acc.push({
          _id: appointment.docData._id,
          name: appointment.docData.name,
          speciality: appointment.docData.speciality,
        });
      }
      return acc;
    }, []);
    return doctors.sort((a, b) => a.name.localeCompare(b.name));
  }, [appointments]);

  const handleSearchSubmit = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(INITIAL_CURRENT_PAGE);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setFilterStatus("all");
    setDateRange("all");
    setSelectedDoctor("all");
    setFeesSortOrder("");
    setDateSortOrder("");
    setCurrentPage(INITIAL_CURRENT_PAGE);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleFeesSortClick = useCallback(() => {
    setFeesSortOrder((prev) =>
      prev === ""
        ? SORT_ORDERS.ASC
        : prev === SORT_ORDERS.ASC
        ? SORT_ORDERS.DESC
        : ""
    );
    setDateSortOrder("");
  }, []);

  const handleDateSortClick = useCallback(() => {
    setDateSortOrder((prev) =>
      prev === ""
        ? SORT_ORDERS.ASC
        : prev === SORT_ORDERS.ASC
        ? SORT_ORDERS.DESC
        : ""
    );
    setFeesSortOrder("");
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setFilterStatus(status);
    setCurrentPage(INITIAL_CURRENT_PAGE);
  }, []);

  const filteredAppointments = useMemo(() => {
    let filtered = appointments.filter((item) => {
      const patientName = item.userData?.name?.toLowerCase() || "";
      const doctorName = item.docData?.name?.toLowerCase() || "";
      const searchMatch =
        patientName.includes(searchTerm.toLowerCase()) ||
        doctorName.includes(searchTerm.toLowerCase());

      if (!searchMatch) return false;

      if (filterStatus === "completed" && !item.isCompleted) return false;
      if (filterStatus === "cancelled" && !item.cancelled) return false;
      if (filterStatus === "pending" && (item.isCompleted || item.cancelled))
        return false;

      if (selectedDoctor !== "all" && item.docData?._id !== selectedDoctor)
        return false;

      return true;
    });

    return filtered;
  }, [appointments, searchTerm, filterStatus, selectedDoctor]);

  const sortedAppointments = useMemo(() => {
    let sorted = [...filteredAppointments];

    if (feesSortOrder) {
      sorted.sort((a, b) => {
        const amountA = parseFloat(a.amount) || 0;
        const amountB = parseFloat(b.amount) || 0;
        return feesSortOrder === SORT_ORDERS.ASC
          ? amountA - amountB
          : amountB - amountA;
      });
    } else if (dateSortOrder) {
      sorted.sort((a, b) => {
        const dateTimeA = dayjs(
          `${a.slotDate} ${a.slotTime}`,
          "D_M_YYYY hh:mm A"
        );
        const dateTimeB = dayjs(
          `${b.slotDate} ${b.slotTime}`,
          "D_M_YYYY hh:mm A"
        );
        return dateSortOrder === SORT_ORDERS.ASC
          ? dateTimeA.valueOf() - dateTimeB.valueOf()
          : dateTimeB.valueOf() - dateTimeA.valueOf();
      });
    }

    return sorted;
  }, [filteredAppointments, feesSortOrder, dateSortOrder]);

  const getSortIcon = (sortOrder) => {
    if (!sortOrder) {
      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    return sortOrder === SORT_ORDERS.ASC ? (
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (filterStatus !== "all") count++;
    if (selectedDoctor !== "all") count++;
    return count;
  }, [searchTerm, filterStatus, selectedDoctor]);

  return (
    <main
      id="main-content"
      className="w-full max-w-7xl mx-auto p-6"
      tabIndex="-1"
    >
      <div className="mb-6 space-y-4">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            All Appointments
          </h1>
          <p className="text-gray-600 mt-1">
            Manage doctor appointments and actions
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="w-full lg:flex-row flex justify-between items-start">
            <SearchBar
              onSearchSubmit={handleSearchSubmit}
              placeholder="Search appointments..."
              aria-label="Search appointments"
            />
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="w-48 px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 transition-colors hover:border-gray-400"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
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
            {filterStatus !== "all" && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Status: {filterStatus}
                <button
                  onClick={() => setFilterStatus("all")}
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
            {dateRange !== "all" && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Date: {dateRange}
                <button
                  onClick={() => setDateRange("all")}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                  aria-label="Remove date filter"
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
            {selectedDoctor !== "all" && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                Doctor:{" "}
                {availableDoctors.find((d) => d._id === selectedDoctor)?.name}
                <button
                  onClick={() => setSelectedDoctor("all")}
                  className="hover:bg-orange-200 rounded-full p-0.5"
                  aria-label="Remove doctor filter"
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
              className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="hidden lg:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b font-semibold text-gray-700">
          <span>#</span>
          <span>Patient</span>
          <span>Age</span>
          <button
            onClick={handleDateSortClick}
            className="flex items-center gap-1 transition-colors focus:outline-none rounded text-left"
            aria-label={`Sort by date ${
              dateSortOrder === SORT_ORDERS.ASC
                ? "descending"
                : dateSortOrder === SORT_ORDERS.DESC
                ? "unsorted"
                : "ascending"
            }`}
          >
            Date & Time {getSortIcon(dateSortOrder)}
          </button>
          <span>Doctor</span>
          <span>Payment</span>
          <button
            onClick={handleFeesSortClick}
            className="flex items-center gap-1 transition-colors focus:outline-none rounded text-left"
            aria-label={`Sort by fees ${
              feesSortOrder === SORT_ORDERS.ASC
                ? "descending"
                : feesSortOrder === SORT_ORDERS.DESC
                ? "unsorted"
                : "ascending"
            }`}
          >
            Fees {getSortIcon(feesSortOrder)}
          </button>
          <span>Action</span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <MiniLoadingSpinner />
            </div>
          ) : isAppoinmentAvailable ? (
            <div className="py-12">
              <EmptyState
                title="No Appointments Yet"
                subtitle="When appointments are made, they'll appear here for you to manage."
              />
            </div>
          ) : sortedAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <EmptyState
                title="No Matches Found"
                subtitle="We couldn't find any appointments matching your search criteria."
              />
              <button
                onClick={handleResetFilters}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg focus:outline-none"
              >
                Show All Appointments
              </button>
            </div>
          ) : (
            <div role="table" aria-label="Appointments table">
              <div className="sr-only">
                <p>
                  Table with {sortedAppointments.length} appointments. Use tab
                  to navigate through rows and actions.
                </p>
              </div>
              {sortedAppointments.map((item, index) => (
                <div key={item._id} role="row" aria-rowindex={index + 1}>
                  <AdminTableRow
                    index={index}
                    cancelAppointment={cancelAppointment}
                    item={item}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isLoading &&
        !isAppoinmentAvailable &&
        sortedAppointments.length > 0 && (
          <div className="mt-6 flex flex-col sm:items-end sm:justify-end">
            <TablePagination
              currentPage={currentPage}
              totalItems={totalAppointments}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              aria-label="Appointments pagination"
            />
          </div>
        )}

      <div className="sr-only">
        <h2>Keyboard Navigation</h2>
        <p>
          Use Tab to navigate between filters, search, and table actions. Use
          Enter or Space to activate buttons and sorting.
        </p>
      </div>
    </main>
  );
};

export default AdminAppointments;
