import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";
import LoadingSpinner from "./components/atoms/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Appointment = lazy(() => import("./pages/Appointment"));
const MyAppointments = lazy(() => import("./pages/MyAppointments"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const Verify = lazy(() => import("./pages/Verify"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoute requireAuth={true} />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/verify" element={<Verify />} />
          </Route>

          <Route element={<ProtectedRoute requireAuth={false} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
