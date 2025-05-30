import { useAuthGuard } from "../hooks/useAuthGuard";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import PropTypes from "prop-types";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  showUnauthorizedMessage = true,
}) => {
  
  const { isLoading } = useAuthGuard(requiredRole, showUnauthorizedMessage);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
  showUnauthorizedMessage: PropTypes.bool,
};

export default ProtectedRoute;
