import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { createPortal } from "react-dom";
import ConfirmationModal from "../molecules/ConfirmationModal";
import ProfileDropdown from "../molecules/ProfileDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all px-6 duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-white py-5"
        }`}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm mb-0">
            <div
              className={`text-primary font-medium cursor-pointer transition-all duration-300 ${
                isScrolled ? "text-3xl" : "text-4xl"
              }`}
              onClick={() => navigate("/")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/")}
              aria-label="MediMeet home"
            >
              MediMeet
            </div>

            <ul className="md:flex items-center gap-8 font-medium hidden">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative py-2 px-1 transition-all duration-300 hover:text-primary group ${
                      isActive ? "text-primary" : "text-gray-700"
                    }`
                  }
                >
                  HOME
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/doctors"
                  className={({ isActive }) =>
                    `relative py-2 px-1 transition-all duration-300 hover:text-primary group ${
                      isActive ? "text-primary" : "text-gray-700"
                    }`
                  }
                >
                  ALL DOCTORS
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `relative py-2 px-1 transition-all duration-300 hover:text-primary group ${
                      isActive ? "text-primary" : "text-gray-700"
                    }`
                  }
                >
                  ABOUT
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `relative py-2 px-1 transition-all duration-300 hover:text-primary group ${
                      isActive ? "text-primary" : "text-gray-700"
                    }`
                  }
                >
                  CONTACT
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              {token && userData ? (
                <div className="transform transition-all duration-300 hover:scale-105">
                  <ProfileDropdown
                    setShowModal={setShowModal}
                    userData={userData}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className={`bg-primary text-white rounded-full font-medium hidden md:block transition-all duration-300 focus:outline-none ${
                    isScrolled ? "px-6 py-2 text-sm" : "px-8 py-3 text-base"
                  }`}
                  aria-label="Create account"
                >
                  Create account
                </button>
              )}

              <button
                onClick={() => setShowMenu(true)}
                className="w-6 md:hidden p-1 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Open mobile menu"
                aria-expanded={showMenu}
              >
                <img
                  src={assets.menu_icon}
                  alt=""
                  className="w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      />

      {createPortal(
        <div
          className={`md:hidden fixed inset-0 z-[9999] transition-all duration-300 ease-in-out ${
            showMenu
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl transition-all duration-300 ease-in-out transform ${
              showMenu ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2
                id="mobile-menu-title"
                className="text-primary text-2xl font-medium cursor-pointer"
                onClick={() => {
                  navigate("/");
                  closeMenu();
                }}
              >
                MediMeet
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close mobile menu"
              >
                <img
                  src={assets.cross_icon}
                  className="w-6 h-6"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>

            <nav className="p-6" aria-label="Mobile navigation">
              <ul className="space-y-4">
                {[
                  { to: "/", label: "HOME" },
                  { to: "/doctors", label: "ALL DOCTORS" },
                  { to: "/about", label: "ABOUT" },
                  { to: "/contact", label: "CONTACT" },
                ].map((item, index) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 hover:bg-blue-50 hover:text-primary ${
                          isActive ? "text-primary bg-blue-50" : "text-gray-700"
                        }`
                      }
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: showMenu
                          ? "slideInRight 0.3s ease-out forwards"
                          : "none",
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {!token && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      navigate("/login");
                      closeMenu();
                    }}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>,
        document.body
      )}

      {createPortal(
        <ConfirmationModal
          onConfirm={() => {
            handleLogout();
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
          isOpen={showModal}
          actionType={"logout"}
        />,
        document.body
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
