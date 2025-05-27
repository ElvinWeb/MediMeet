import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <h3 className="text-primary font-medium text-4xl mb-2">MediMeet</h3>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Your trusted partner for managing healthcare needs conveniently and
            securely. Our HIPAA-compliant platform lets you browse certified
            specialists, book virtual or in-person visits in seconds, and keep
            all your medical records in one place. From first check-ups to
            ongoing care, MediMeet brings personalized, 24/7 support right to
            your fingertips.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/about">
              <li>About us</li>
            </NavLink>
            <NavLink to="/doctors">
              <li>Doctors</li>
            </NavLink>
            <NavLink to="/privacy-policy">
              <li>Privacy policy</li>
            </NavLink>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+99450-515-50-55</li>
            <li>support@medimeet.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
