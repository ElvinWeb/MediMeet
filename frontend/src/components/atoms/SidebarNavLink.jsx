import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarNavLink = ({ link, closeMenu, index, showMenu }) => {
  return (
    <NavLink
      to={link.to}
      onClick={closeMenu}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 hover:bg-blue-50 hover:text-primary ${
          isActive ? "text-primary bg-blue-50" : "text-gray-700"
        }`
      }
      style={{
        animationDelay: `${index * 100}ms`,
        animation: showMenu ? "slideInRight 0.3s ease-out forwards" : "none",
      }}
    >
      {link.label}
    </NavLink>
  );
};

SidebarNavLink.propTypes = {
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
  }).isRequired,
  closeMenu: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

export default SidebarNavLink;
