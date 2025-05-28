import { useContext, useEffect, useState, useMemo } from "react";
import EmptyState from "../../components/atoms/EmptyState";
import SearchBar from "../../components/molecules/SearchBar";
import TablePagination from "../../components/molecules/TablePagination";
import AdminTableRow from "../../components/molecules/AdminTableRow";
import { AdminContext } from "../../context/AdminContext";
import {
  ITEMS_PER_PAGE,
  SORT_ORDERS,
  INITIAL_CURRENT_PAGE,
} from "../../constants/tableConstants";
import MiniLoadingSpinner from "../../components/atoms/MiniLoadingSpinner";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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

  useEffect(() => {
    const fetchData = async () => {
      if (aToken) {
        setIsLoading(true);
        try {
          await getAllAppointments(currentPage, ITEMS_PER_PAGE);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [aToken, currentPage, getAllAppointments]);

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
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

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const patientName = item.userData?.name?.toLowerCase();
      const doctorName = item.docData?.name?.toLowerCase();
      return (
        patientName.includes(searchTerm.trim().toLowerCase()) ||
        doctorName.includes(searchTerm.trim().toLowerCase())
      );
    });
  }, [appointments, searchTerm]);

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

  const feesSortIcon =
    feesSortOrder === SORT_ORDERS.ASC
      ? "↑"
      : feesSortOrder === SORT_ORDERS.DESC
      ? "↓"
      : null;

  const dateSortIcon =
    dateSortOrder === SORT_ORDERS.ASC
      ? "↑"
      : dateSortOrder === SORT_ORDERS.DESC
      ? "↓"
      : null;

  console.log("Appointments:", appointments);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <SearchBar onSearchSubmit={handleSearchSubmit} />

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_2fr_1fr_1fr] grid-flow-col gap-1 py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p
            onClick={handleDateSortClick}
            className="cursor-pointer select-none hover:text-primary transition-colors"
          >
            Date & Time {dateSortIcon}
          </p>
          <p>Doctor</p>
          <p>Payment</p>
          <p
            onClick={handleFeesSortClick}
            className="cursor-pointer select-none hover:text-primary transition-colors"
          >
            Fees {feesSortIcon}
          </p>
          <p>Action</p>
        </div>
        {isLoading ? (
          <MiniLoadingSpinner />
        ) : isAppoinmentAvailable ? (
          <EmptyState
            title="No Appointments Yet"
            subtitle="When appointments are made, they’ll appear here."
          />
        ) : filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center pb-4">
            <EmptyState
              title="No Matches Found"
              subtitle="We couldn't find any appointments matching your search."
            />
            <button
              onClick={handleResetSearch}
              className="px-5 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-all"
            >
              Show All Appointments
            </button>
          </div>
        ) : (
          sortedAppointments.map((item, index) => (
            <AdminTableRow
              key={item._id}
              index={index}
              cancelAppointment={cancelAppointment}
              item={item}
            />
          ))
        )}
        <TablePagination
          currentPage={currentPage}
          totalItems={totalAppointments}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminAppointments;
