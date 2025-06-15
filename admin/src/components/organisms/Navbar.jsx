import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { DoctorContext } from "../../context/DoctorContext";
import ConfirmationModal from "../molecules/ConfirmationModal";
import { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const Navbar = ({ isMobile, onMenuClick }) => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userType = aToken ? "Admin" : "Doctor";

  const handleLogout = () => {
    navigate("/");
    dToken && setDToken("");
    dToken && sessionStorage.removeItem("dToken");
    aToken && setAToken("");
    aToken && sessionStorage.removeItem("aToken");
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
        <div className="flex items-center gap-2 text-xs">
          <h3
            className="text-primary text-4xl font-medium cursor-pointer"
            onClick={() => navigate("/")}
          >
            MediMeet
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            {userType}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-primary text-white text-sm px-10 py-2 rounded-full"
          >
            Logout
          </button>
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
              aria-label="Open sidebar"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {createPortal(
        <ConfirmationModal
          onConfirm={() => {
            handleLogout();
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
          isOpen={showModal}
          actionType={"logout"}
        />,
        document.body
      )}
    </>
  );
};

Navbar.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func,
};

export default Navbar;