import { NAV_LINKS } from "../../constants/navLinkConstants";
import NavBarLink from "../atoms/NavBarLink";

const Footer = () => {
  return (
    <footer
      id="footer"
      aria-labelledby="Footer"
      className="min-h-[300px]"
    >
      <div className="md:my-10 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-14 py-10 pt-16 text-sm h-full">
          <div className="order-1">
            <h3 className="text-primary font-medium text-4xl mb-4 leading-tight">
              MediMeet
            </h3>
            <p className="w-full md:w-full lg:w-4/5 text-gray-600 leading-6 text-sm">
              Your trusted partner for managing healthcare needs conveniently
              and securely. Our HIPAA-compliant platform lets you browse
              certified specialists, book virtual or in-person visits in
              seconds, and keep all your medical records in one place.
            </p>
          </div>

          <div className="order-2">
            <h4 className="text-xl font-medium mb-5 leading-tight text-gray-900">
              COMPANY
            </h4>
            <nav aria-label="Footer company links">
              <ul className="flex flex-col gap-3 text-gray-600">
                {NAV_LINKS.slice(0, 3).map((link) => (
                  <li key={link.to} className="leading-tight">
                    <NavBarLink link={link} isFooter={true} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="order-3">
            <h4 className="text-xl font-medium mb-5 leading-tight text-gray-900">
              GET IN TOUCH
            </h4>
            <address className="not-italic">
              <ul className="flex flex-col gap-3 text-gray-600">
                <li className="leading-tight">
                  <a
                    href="tel:+99450-515-50-55"
                    className="hover:text-primary transition-colors duration-200"
                    aria-label="Call us at +99450-515-50-55"
                  >
                    +99450-515-50-55
                  </a>
                </li>
                <li className="leading-tight">
                  <a
                    href="mailto:support@medimeet.com"
                    className="hover:text-primary transition-colors duration-200"
                    aria-label="Email us at support@medimeet.com"
                  >
                    support@medimeet.com
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <p className="py-6 text-sm text-center leading-tight text-gray-600">
            Copyright 2025 - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
