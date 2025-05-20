import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import EmptyState from "../../components/EmptyState";
import SearchBar from "../../components/SearchBar";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { AdminContext } from "../../context/AdminContext";
import { calculateAge } from "../../utils/ageUtils";
import { slotDateFormat } from "../../utils/dateUtils";
import TablePagination from "../../components/TablePagination";

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
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Payment</p>
          <p>Fees</p>
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
          filteredAppointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  className="w-8 rounded-full"
                  alt=""
                />{" "}
                <p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={item.docData.image}
                  className="w-8 rounded-full bg-gray-200"
                  alt=""
                />{" "}
                <p>{item.docData.name}</p>
              </div>
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
                {CURRENCY_SYMBOL}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
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

export default AllAppointments;
