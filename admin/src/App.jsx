import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DoctorContext } from "./context/DoctorContext";
import { AdminContext } from "./context/AdminContext";
import { Suspense, lazy } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../frontend/src/components/LoadingSpinner";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AllAppointments = lazy(() => import("./pages/Admin/AllAppointments"));
const AddDoctor = lazy(() => import("./pages/Admin/AddDoctor"));
const UpdateDoctor = lazy(() => import("./pages/Admin/UpdateDoctor"));
const DoctorsList = lazy(() => import("./pages/Admin/DoctorsList"));
const DoctorDetails = lazy(() => import("./pages/Admin/DoctorDetails"));
const DoctorDashboard = lazy(() => import("./pages/Doctor/DoctorDashboard"));
const DoctorAppointments = lazy(() =>
  import("./pages/Doctor/DoctorAppointments")
);
const DoctorProfile = lazy(() => import("./pages/Doctor/DoctorProfile"));

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const isAuthenticated = dToken || aToken;

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {aToken && (
                    <>
                      <Route path="/admin-dashboard" element={<Dashboard />} />
                      <Route
                        path="/all-appointments"
                        element={<AllAppointments />}
                      />
                      <Route path="/add-doctor" element={<AddDoctor />} />
                      <Route path="/update-doctor" element={<UpdateDoctor />} />
                      <Route
                        path="/doctor-details"
                        element={<DoctorDetails />}
                      />
                      <Route path="/doctor-list" element={<DoctorsList />} />
                    </>
                  )}
                  {dToken && (
                    <>
                      <Route
                        path="/doctor-dashboard"
                        element={<DoctorDashboard />}
                      />
                      <Route
                        path="/doctor-appointments"
                        element={<DoctorAppointments />}
                      />
                      <Route
                        path="/doctor-profile"
                        element={<DoctorProfile />}
                      />
                    </>
                  )}
                </Routes>
              </Suspense>
            </main>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
