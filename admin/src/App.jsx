import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatedLayout from "./layout/AuthenticatedLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import {
  adminRoutes,
  doctorRoutes,
  errorRoutes,
  publicRoutes,
  rootRoutes,
} from "./routes/routesConfig";

const App = () => {
  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />

      <Routes>

        {publicRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <PublicRoute>
                <Component />
              </PublicRoute>
            }
          />
        ))}


        {rootRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {adminRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRole="admin">
                <AuthenticatedLayout>
                  <Component />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
        ))}

        {doctorRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRole="doctor">
                <AuthenticatedLayout>
                  <Component />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
        ))}

        {errorRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
};

export default App;
