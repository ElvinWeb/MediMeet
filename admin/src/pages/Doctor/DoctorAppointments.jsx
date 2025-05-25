import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import EmptyState from "../../components/EmptyState";
import SearchBar from "../../components/SearchBar";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { DoctorContext } from "../../context/DoctorContext";
import { calculateAge } from "../../utils/ageUtils";
import { slotDateFormat } from "../../utils/dateUtils";
import TablePagination from "../../components/TablePagination";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    isAppoinmentAvailable,
    totalAppointments,
  } = useContext(DoctorContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;


  const filteredAppointments = appointments.filter((item) => {
    const patientName = item.userData.name.toLowerCase();
    const doctorName = item.docData.name.toLowerCase();
    return (
      patientName.includes(searchTerm.toLowerCase()) ||
      doctorName.includes(searchTerm.toLowerCase())
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
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <SearchBar onSearchSubmit={handleSearchSubmit} />

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b">
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
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  className="w-8 rounded-full"
                  alt=""
                />{" "}
                <p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <div>
                {item.payment ? (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    Not Paid
                  </span>
                )}
              </div>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <p>
                {CURRENCY_SYMBOL}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                  />
                </div>
              )}
            </div>
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

export default DoctorAppointments;
