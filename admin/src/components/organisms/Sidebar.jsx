import { useContext } from "react";
import PropTypes from "prop-types";
import { AdminContext } from "../../context/AdminContext";
import { DoctorContext } from "../../context/DoctorContext";
import AdminSidebarList from "../molecules/AdminSidebarList";
import DoctorSidebarList from "../molecules/DoctorSidebarList";

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return (
    <>
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "lg:hidden" : ""}`}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full">
          {isMobile && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
              <span className="text-lg font-semibold text-primary">
                MediMeet
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <nav className="flex-1 px-4 py-6 overflow-y-auto" role="navigation">
            {aToken && (
              <AdminSidebarList onItemClick={isMobile ? onClose : undefined} />
            )}
            {dToken && (
              <DoctorSidebarList onItemClick={isMobile ? onClose : undefined} />
            )}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>MediMeet Dashboard</p>
              <p>v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Sidebar;
