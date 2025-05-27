import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import AdminDoctorItem from "../atoms/AdminDoctorItem";
import EmptyState from "../atoms/EmptyState";
const AdminDoctorActivity = () => {
  const { aToken, dashData, getDashData, doctors, getAllDoctors } =
    useContext(AdminContext);
  const isDoctorAvailable = !doctors || doctors.length === 0;

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getDashData();
    }
  }, [aToken, getAllDoctors, getDashData]);
  return (
    <div className="bg-white columns-lg rounded-md shadow">
      <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
        <img src={assets.change_icon} width={20} height={20} />
        <p className="font-semibold">Doctor Activity</p>
      </div>
      {isDoctorAvailable ? (
        <EmptyState
          title="No Doctors Yet"
          subtitle="When doctors are made, they’ll appear here."
        />
      ) : (
        <div className="border border-t-0">
          {dashData.doctorActivity.map((item) => (
            <AdminDoctorItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDoctorActivity;
