import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavBarLink = ({ link, isFooter = false }) => {
  return (
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        `relative py-2 px-1 transition-all duration-300 hover:text-primary group ${
          isActive && !isFooter ? "text-primary" : "text-gray-700"
        }`
      }
    >
      {link.label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </NavLink>
  );
};

NavBarLink.propTypes = {
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
  }).isRequired,
  isFooter: PropTypes.bool,
};

export default NavBarLink;
