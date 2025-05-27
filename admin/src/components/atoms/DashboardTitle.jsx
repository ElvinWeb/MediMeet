import PropTypes from "prop-types";

const DashboardTitle = ({ isAdmin, profileData }) => {
  return (
    <header className="flex flex-col items-start gap-3 mb-5">
      <h1 className="text-4xl font-semibold text-primary">
        {isAdmin
          ? "Welcome back, Admin!"
          : `Welcome back, Dr. ${profileData?.name}`}
      </h1>
      <p className="text-gray-600 text-lg">
        Here’s a quick overview of today’s activity in MediMeet.
      </p>
    </header>
  );
};

DashboardTitle.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  profileData: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default DashboardTitle;
