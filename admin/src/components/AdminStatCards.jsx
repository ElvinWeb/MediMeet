import { assets } from "../assets/assets";
import { useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { CURRENCY_SYMBOL } from "../constants/currencySymbol";

const AdminStatCards = () => {
  const { aToken, dashData, getAllDoctors, getDashData, getAllAppointments } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getDashData();
      getAllAppointments();
    }
  }, [aToken, getAllAppointments, getAllDoctors, getDashData]);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-14" src={assets.doctor_icon} alt="" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {dashData.doctors}
          </p>
          <p className="text-gray-400">Doctors</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-14" src={assets.appointments_icon} alt="" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {dashData.appointments}
          </p>
          <p className="text-gray-400">Appointments</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-14" src={assets.patients_icon} alt="" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {dashData.patients}
          </p>
          <p className="text-gray-400">Patients</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-14" src={assets.earning_icon} alt="" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {CURRENCY_SYMBOL} {dashData.earnings}
          </p>
          <p className="text-gray-400">Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatCards;
