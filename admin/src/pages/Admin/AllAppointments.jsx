import { useContext, useEffect, useState } from "react";
import EmptyState from "../../components/atoms/EmptyState";
import SearchBar from "../../components/molecules/SearchBar";
import TablePagination from "../../components/molecules/TablePagination";
import AdminTableRow from "../../components/molecules/AdminTableRow";
import { AdminContext } from "../../context/AdminContext";

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    cancelAppointment,
    getAllAppointments,
    isAppoinmentAvailable,
    totalAppointments,
  } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredAppointments = appointments.filter((item) => {
    const patientName = item.userData.name.toLowerCase();
    const doctorName = item.docData.name.toLowerCase();
    return (
      patientName.includes(searchTerm.trim().toLowerCase()) ||
      doctorName.includes(searchTerm.trim().toLowerCase())
    );
  });

  const processedAppointments =
    sortOrder === "asc"
      ? [...filteredAppointments].sort((a, b) => a.amount - b.amount)
      : sortOrder === "desc"
      ? [...filteredAppointments].sort((a, b) => b.amount - a.amount)
      : filteredAppointments;
  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (aToken) {
      getAllAppointments(currentPage, itemsPerPage);
    }
  }, [aToken, appointments, currentPage, getAllAppointments]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <SearchBar onSearchSubmit={handleSearchSubmit} />

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_2fr_1fr_1fr] grid-flow-col gap-1 py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Payment</p>
          <p
            onClick={() =>
              setSortOrder((prev) =>
                prev === "" ? "asc" : prev === "asc" ? "desc" : ""
              )
            }
            className="cursor-pointer"
          >
            Fees {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : null}
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
              className="px-5 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-all"
            >
              Show All Appointments
            </button>
          </div>
        ) : (
          processedAppointments.map((item, index) => (
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
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AllAppointments;
