import { useContext, useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/atoms/EmptyState";
import SearchBar from "../../components/molecules/SearchBar";
import TablePagination from "../../components/molecules/TablePagination";
import DoctorTableRow from "../../components/molecules/DoctorTableRow";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    isAppoinmentAvailable,
  } = useContext(DoctorContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken, getAppointments]);

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const patientName = item.userData?.name?.toLowerCase() || "";
      const doctorName = item.docData?.name?.toLowerCase() || "";
      return (
        patientName.includes(searchTerm.toLowerCase()) ||
        doctorName.includes(searchTerm.toLowerCase())
      );
    });
  }, [appointments, searchTerm]);

  const sortedAppointments = useMemo(() => {
    if (sortOrder === "asc") {
      return [...filteredAppointments].sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "desc") {
      return [...filteredAppointments].sort((a, b) => b.amount - a.amount);
    }
    return filteredAppointments;
  }, [filteredAppointments, sortOrder]);

  const currentAppointments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedAppointments.slice(start, end);
  }, [sortedAppointments, currentPage, itemsPerPage]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <SearchBar onSearchSubmit={handleSearchSubmit} />

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] grid-flow-col gap-1 py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p
            onClick={() =>
              setSortOrder((prev) =>
                prev === "" ? "asc" : prev === "asc" ? "desc" : ""
              )
            }
            className="cursor-pointer"
          >
            Fees {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : ""}
          </p>
          <p>Action</p>
        </div>

        {isAppoinmentAvailable ? (
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
              className="px-5 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-all mt-2"
            >
              Show All Appointments
            </button>
          </div>
        ) : (
          currentAppointments.map((item, index) => (
            <DoctorTableRow
              key={item._id}
              item={item}
              index={index}
              cancelAppointment={cancelAppointment}
              completeAppointment={completeAppointment}
            />
          ))
        )}
      </div>

      <TablePagination
        currentPage={currentPage}
        totalItems={filteredAppointments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DoctorAppointments;
