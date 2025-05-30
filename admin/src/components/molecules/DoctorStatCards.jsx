import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { CURRENCY_SYMBOL } from "../../constants/currencySymbol";
import { DoctorContext } from "../../context/DoctorContext";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const DoctorStatCards = ({ isLoading }) => {
  const { dToken, dashData, getDashData, getAppointments } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
      getAppointments();
    }
  }, [dToken, getAppointments, getDashData]);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        {isLoading ? (
          <Skeleton width={40} height={45} baseColor="#F5F7FF" />
        ) : (
          <div className="p-3 bg-[#F5F7FF] rounded-md">
            <img className="w-8" src={assets.calendar_icon} alt="" />
          </div>
        )}
        {isLoading ? (
          <Skeleton width={120} height={45} baseColor="#F5F7FF" />
        ) : (
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.freeSlotsToday}
            </p>
            <p className="text-gray-400">Free Slots</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        {isLoading ? (
          <Skeleton width={40} height={45} baseColor="#F5F7FF" />
        ) : (
          <img className="w-14" src={assets.appointments_icon} alt="" />
        )}
        {isLoading ? (
          <Skeleton width={120} height={45} baseColor="#F5F7FF" />
        ) : (
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointmentsCount}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        {isLoading ? (
          <Skeleton width={40} height={45} baseColor="#F5F7FF" />
        ) : (
          <img className="w-14" src={assets.patients_icon} alt="" />
        )}
        {isLoading ? (
          <Skeleton width={120} height={45} baseColor="#F5F7FF" />
        ) : (
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        {isLoading ? (
          <Skeleton width={40} height={45} baseColor="#F5F7FF" />
        ) : (
          <img className="w-14" src={assets.earning_icon} alt="" />
        )}
        {isLoading ? (
          <Skeleton width={120} height={45} baseColor="#F5F7FF" />
        ) : (
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {CURRENCY_SYMBOL} {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        )}
      </div>
    </div>
  );
};

DoctorStatCards.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default DoctorStatCards;
