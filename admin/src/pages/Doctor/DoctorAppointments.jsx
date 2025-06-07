import { useContext, useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/atoms/EmptyState";
import SearchBar from "../../components/molecules/SearchBar";
import TablePagination from "../../components/molecules/TablePagination";
import DoctorTableRow from "../../components/molecules/DoctorTableRow";
import { DoctorContext } from "../../context/DoctorContext";
import {
  INITIAL_CURRENT_PAGE,
  ITEMS_PER_PAGE,
  SORT_ORDERS,
} from "../../constants/tableConstants";
import MiniLoadingSpinner from "../../components/atoms/MiniLoadingSpinner";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "react-toastify";

dayjs.extend(customParseFormat);

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    totalAppointments,
    cancelAppointment,
    completeAppointment,
    isAppoinmentAvailable,
  } = useContext(DoctorContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [feesSortOrder, setFeesSortOrder] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      if (dToken) {
        setIsLoading(true);
        try {
          await getAppointments(currentPage, ITEMS_PER_PAGE);
        } catch {
          toast.error("Failed to fetch appointments. Please try again later!");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [dToken, currentPage, getAppointments]);

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
    setCurrentPage(INITIAL_CURRENT_PAGE);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setCurrentPage(INITIAL_CURRENT_PAGE);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFeesSortClick = () => {
    setFeesSortOrder((prev) =>
      prev === ""
        ? SORT_ORDERS.ASC
        : prev === SORT_ORDERS.ASC
        ? SORT_ORDERS.DESC
        : ""
    );
    setDateSortOrder("");
  };

  const handleDateSortClick = () => {
    setDateSortOrder((prev) =>
      prev === ""
        ? SORT_ORDERS.ASC
        : prev === SORT_ORDERS.ASC
        ? SORT_ORDERS.DESC
        : ""
    );
    setFeesSortOrder("");
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(INITIAL_CURRENT_PAGE);
  };

  const filteredAppointments = useMemo(() => {
    let filtered = appointments.filter((item) => {
      const patientName = item.userData?.name?.toLowerCase() || "";
      const doctorName = item.docData?.name?.toLowerCase() || "";
      const matchesSearch =
        patientName.includes(searchTerm.toLowerCase()) ||
        doctorName.includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterStatus === "completed") return item.isCompleted;
      if (filterStatus === "cancelled") return item.cancelled;
      
      return true; 
    });

    return filtered;
  }, [appointments, searchTerm, filterStatus]);

  const sortedAppointments = useMemo(() => {
    let sorted = [...filteredAppointments];

    if (feesSortOrder) {
      if (feesSortOrder === SORT_ORDERS.ASC) {
        sorted = sorted.sort((a, b) => a.amount - b.amount);
      } else if (feesSortOrder === SORT_ORDERS.DESC) {
        sorted = sorted.sort((a, b) => b.amount - a.amount);
      }
    } else if (dateSortOrder) {
      if (dateSortOrder === SORT_ORDERS.ASC) {
        sorted.sort((a, b) => {
          const dateTimeA = dayjs(
            `${a.slotDate} ${a.slotTime}`,
            "D_M_YYYY hh:mm A"
          );
          const dateTimeB = dayjs(
            `${b.slotDate} ${b.slotTime}`,
            "D_M_YYYY hh:mm A"
          );
          return dateTimeA - dateTimeB;
        });
      } else if (dateSortOrder === SORT_ORDERS.DESC) {
        sorted.sort((a, b) => {
          const dateTimeA = dayjs(
            `${a.slotDate} ${a.slotTime}`,
            "D_M_YYYY hh:mm A"
          );
          const dateTimeB = dayjs(
            `${b.slotDate} ${b.slotTime}`,
            "D_M_YYYY hh:mm A"
          );
          return dateTimeB - dateTimeA;
        });
      }
    }

    return sorted;
  }, [dateSortOrder, feesSortOrder, filteredAppointments]);

  const getSortIcon = (sortOrder) => {
    if (!sortOrder)
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

  return (
    <main
      id="main-content"
      className="w-full max-w-7xl mx-auto p-6"
      tabIndex="-1"
    >
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              onSearchSubmit={handleSearchSubmit}
              placeholder="Search by patient name..."
              aria-label="Search appointments"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="status-filter" className="sr-only">
              Filter by appointment status
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="min-w-[140px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium transition-colors hover:border-gray-400 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-no-repeat bg-[right_12px_center]"
              aria-describedby="status-filter-help"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <p id="status-filter-help" className="sr-only">
              Filter appointments by their current status
            </p>
          </div>
        </div>

        {(searchTerm || filterStatus !== "all") && (
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
            <button
              onClick={handleResetSearch}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {!isLoading &&
          `Found ${sortedAppointments.length} appointment${
            sortedAppointments.length !== 1 ? "s" : ""
          }`}
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="hidden lg:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b font-semibold text-gray-700">
          <span>#</span>
          <span>Patient</span>
          <span>Age</span>
          <span>Payment</span>
          <button
            onClick={handleDateSortClick}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
          <button
            onClick={handleFeesSortClick}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
                subtitle="When patients book appointments, they'll appear here for you to manage."
              />
            </div>
          ) : sortedAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <EmptyState
                title="No Matches Found"
                subtitle="We couldn't find any appointments matching your search criteria."
              />
              <button
                onClick={handleResetSearch}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  <DoctorTableRow
                    item={item}
                    index={index}
                    cancelAppointment={cancelAppointment}
                    completeAppointment={completeAppointment}
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

export default DoctorAppointments;
