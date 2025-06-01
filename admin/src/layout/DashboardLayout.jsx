import PropTypes from "prop-types";
import Navbar from "../components/organisms/Navbar";
import Sidebar from "../components/organisms/Sidebar";
import { Suspense } from "react";
import LoadingSpinner from "../components/atoms/LoadingSpinner";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </main>
      </div>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
