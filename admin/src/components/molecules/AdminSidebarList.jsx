import { NavLink } from "react-router-dom";
import { ADMIN_SIDEBAR_LIST } from "../../constants/sidebarConstants";

const AdminSidebarList = () => {
  return (
    <ul className="text-[#515151] mt-5">
      {ADMIN_SIDEBAR_LIST.map(({ id, path, name, icon }) => (
        <NavLink
          key={id}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
            }`
          }
        >
          <img className="min-w-5" src={icon} alt={name} />
          <p className="hidden md:block">{name}</p>
        </NavLink>
      ))}
    </ul>
  );
};

export default AdminSidebarList;
