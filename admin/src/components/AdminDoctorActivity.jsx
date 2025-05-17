import { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import EmptyState from "./EmptyState";
import { AdminContext } from "../context/AdminContext";
import { formatDate } from "../utils/dateUtils";
const AdminDoctorActivity = () => {
  const { aToken, dashData, getDashData, doctors, getAllDoctors } =
    useContext(AdminContext);
  const isDoctorAvailable = !doctors || doctors.length === 0;

  useEffect(() => {
    if (aToken && !doctors && !dashData) {
      getAllDoctors();
      getDashData();
    }
  }, [aToken, dashData, doctors, getAllDoctors, getDashData]);
  return (
    <div className="bg-white columns-sm">
      <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
        <img src={assets.list_icon} alt="" width={20} height={20} />
        <p className="font-semibold">Doctor Activity</p>
      </div>
      {isDoctorAvailable ? (
        <EmptyState
          title="No Doctors Yet"
          subtitle="When doctors are made, they’ll appear here."
        />
      ) : (
        <div className="border border-t-0">
          {dashData.doctorActivity.map((item, index) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              key={index}
            >
              <img className="rounded-full w-10" src={item.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.name}</p>
                <p className="text-gray-600 ">
                  {item?.type === "added"
                    ? `Added on ${formatDate(item.date, true)}`
                    : `Updated on ${formatDate(item.date, true)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDoctorActivity;
