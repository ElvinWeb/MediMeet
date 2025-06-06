import { useNavigate } from "react-router-dom";
import SEOHelmet from "../components/SEO/SEOHelmet";

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
    <>
      <SEOHelmet
        title="Page Not Found - 404 Error"
        description="The page you are looking for could not be found. Return to MediMeet homepage or use navigation to find what you need."
        keywords="404 error, page not found, medimeet error, missing page"
      />

      <main
        role="main"
        className="flex items-center justify-center min-h-screen px-4"
        aria-labelledby="error-heading"
        aria-describedby="error-description"
      >
        <div role="alert" aria-live="assertive" className="text-center">
          <h1
            id="error-heading"
            className="text-9xl font-bold text-primary mb-4"
            aria-label="Error 404"
          >
            404
          </h1>
          <h2 className="text-gray-600 mb-4 text-2xl">Page Not Found</h2>
          <p className="text-gray-500 mb-6 text-lg">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            role="group"
            aria-labelledby="navigation-options"
          >
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
    </>
  );
};

export default NotFound;
