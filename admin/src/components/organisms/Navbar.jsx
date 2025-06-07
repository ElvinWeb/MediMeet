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
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
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

// const Navbar = ({ onMenuClick, isMobile }) => {
//   const { dToken, setDToken } = useContext(DoctorContext);
//   const { aToken, setAToken } = useContext(AdminContext);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const navigate = useNavigate();

//   const userType = aToken ? "Admin" : "Doctor";

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     try {
//       // Add any logout API calls here if needed
//       await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

//       navigate("/");
//       if (dToken) {
//         setDToken("");
//         localStorage.removeItem("dToken");
//       }
//       if (aToken) {
//         setAToken("");
//         localStorage.removeItem("aToken");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       setIsLoggingOut(false);
//       setShowModal(false);
//     }
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
//         <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex items-center gap-3">
//             {/* Mobile menu button */}
//             {isMobile && (
//               <button
//                 onClick={onMenuClick}
//                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
//                 aria-label="Open sidebar"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             )}

//             {/* Logo and brand */}
//             <div className="flex items-center gap-2">
//               <h1
//                 className="text-primary text-2xl lg:text-4xl font-medium cursor-pointer hover:text-blue-700 transition-colors"
//                 onClick={() => navigate("/")}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     navigate("/");
//                   }
//                 }}
//               >
//                 MediMeet
//               </h1>
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
//                 {userType}
//               </span>
//             </div>
//           </div>

//           {/* User actions */}
//           <div className="flex items-center gap-3">
//             {/* User info (hidden on mobile) */}
//             <div className="hidden sm:block text-right">
//               <p className="text-sm font-medium text-gray-900">Welcome back!</p>
//               <p className="text-xs text-gray-500">{userType} Dashboard</p>
//             </div>

//             {/* Logout button */}
//             <button
//               type="button"
//               onClick={() => setShowModal(true)}
//               disabled={isLoggingOut}
//               className="inline-flex items-center gap-2 bg-primary text-white text-sm px-4 lg:px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               {isLoggingOut ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Logging out...
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                   <span className="hidden sm:inline">Logout</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Enhanced Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
//               onClick={() => setShowModal(false)}
//             ></div>

//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                     <svg
//                       className="h-6 w-6 text-red-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900">
//                       Confirm Logout
//                     </h3>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">
//                         Are you sure you want to logout? You will need to sign
//                         in again to access your dashboard.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoggingOut ? "Logging out..." : "Logout"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   disabled={isLoggingOut}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
