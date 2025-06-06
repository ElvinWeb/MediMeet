import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <main role="main" className="flex items-center justify-center min-h-screen">
      <div className="text-center" role="alert">
        <h1
          className="text-9xl font-bold text-primary mb-4"
          aria-label="Error 404"
        >
          404
        </h1>
        <h2 className="text-gray-600 mb-4 text-2xl">Page Not Found</h2>
        <p className="text-gray-500 mb-6 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-primary text-white rounded focus:outline-none transition-colors"
            type="button"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="px-6 py-3 border border-primary text-primary rounded focus:outline-none transition-colors"
            type="button"
            aria-label="Go to home page"
          >
            Go Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
