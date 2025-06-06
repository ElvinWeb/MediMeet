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
    <main
      id="main-content"
      role="main"
      className="flex items-center justify-center min-h-screen px-4"
      tabIndex="-1"
      aria-labelledby="error-heading"
      aria-describedby="error-description"
    >
      <div className="text-center">
        <div role="alert" aria-live="assertive">
          <h1
            id="error-heading"
            className="text-9xl font-bold text-primary mb-4"
            aria-label="Error 404 - Page not found"
          >
            404
          </h1>
        </div>

        <h2 className="text-gray-800 mb-4 text-2xl">Page Not Found</h2>

        <p id="error-description" className="text-gray-700 mb-6 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-primary text-white rounded focus:outline-none "
            type="button"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="px-6 py-3 border border-primary text-primary rounded focus:outline-none "
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
