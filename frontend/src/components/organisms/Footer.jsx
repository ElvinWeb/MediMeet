import { NAV_LINKS } from "../../constants/navLinkConstants";
import NavBarLink from "../atoms/NavBarLink";

const Footer = () => {
  return (
    <footer id="footer" aria-labelledby="Footer" className="min-h-[250px]">
      <div className="md:mx-10">
        <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-14 my-10 mt-40 text-sm">
          <div className="order-1">
            <h3 className="text-primary font-medium text-4xl mb-2 leading-tight">
              MediMeet
            </h3>
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
              Your trusted partner for managing healthcare needs conveniently
              and securely. Our HIPAA-compliant platform lets you browse
              certified specialists, book virtual or in-person visits in
              seconds, and keep all your medical records in one place.
            </p>
          </div>

          <div className="order-2 sm:order-2">
            <p className="text-xl font-medium mb-5 leading-tight">COMPANY</p>
            <ul className="flex flex-col gap-4 text-gray-600">
              {NAV_LINKS.slice(0, 3).map((link) => (
                <li key={link.to} className="leading-tight">
                  <NavBarLink link={link} isFooter={true} />
                </li>
              ))}
            </ul>
          </div>

          <div className="order-3 sm:order-3">
            <p className="text-xl font-medium mb-5 leading-tight">
              GET IN TOUCH
            </p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="leading-tight">+99450-515-50-55</li>
              <li className="leading-tight">support@medimeet.com</li>
            </ul>
          </div>
        </div>

        <div>
          <hr />
          <p className="py-5 text-sm text-center leading-tight">
            Copyright 2025 - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
