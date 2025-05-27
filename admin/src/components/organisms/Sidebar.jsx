import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { DoctorContext } from "../../context/DoctorContext";
import AdminSidebarList from "../molecules/AdminSidebarList";
import DoctorSidebarList from "../molecules/DoctorSidebarList";

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return (
    <div className="h-screen bg-white border-r">
      {aToken && <AdminSidebarList />}
      {dToken && <DoctorSidebarList />}
    </div>
  );
};

export default Sidebar;
