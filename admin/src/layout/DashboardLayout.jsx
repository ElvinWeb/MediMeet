import PropTypes from "prop-types";
import { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import Navbar from "../components/organisms/Navbar";
import Sidebar from "../components/organisms/Sidebar";

const DashboardLayout = ({ children, className = "" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Navbar
        isMobile={isMobile}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex relative">
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />

        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isMobile ? "ml-0" : "lg:ml-0"
          }`}
          role="main"
          aria-label="Main content"
        >
          <div className="p-4 lg:p-6 xl:p-8">
            <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default DashboardLayout;
