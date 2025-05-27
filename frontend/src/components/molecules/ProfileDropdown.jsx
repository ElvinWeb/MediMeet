import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const ProfileDropdown = ({ setShowModal, userData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 cursor-pointer group relative">
      <img className="w-8 rounded-full" src={userData.image} alt="" />
      <img className="w-2.5" src={assets.dropdown_icon} alt="" />
      <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
        <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
          <p
            onClick={() => navigate("/my-profile")}
            className="hover:text-black cursor-pointer"
          >
            My Profile
          </p>
          <p
            onClick={() => navigate("/my-appointments")}
            className="hover:text-black cursor-pointer"
          >
            My Appointments
          </p>
          <p
            onClick={() => setShowModal(true)}
            className="hover:text-black cursor-pointer"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileDropdown;
