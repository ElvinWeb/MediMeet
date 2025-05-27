import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { DoctorContext } from "../../context/DoctorContext";
import ConfirmationModal from "../molecules/ConfirmationModal";
import { useState } from "react";
import { createPortal } from "react-dom";

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
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
          <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
            {aToken ? "Admin" : "Doctor"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        >
          Logout
        </button>
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

export default Navbar;
