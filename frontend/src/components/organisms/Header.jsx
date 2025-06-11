import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <section aria-labelledby="hero-heading">
      <div className="flex flex-col md:flex-row flex-wrap bg-primary shadow-sm rounded-lg px-6 md:px-10 lg:px-20 mt-8">
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <h1
            id="hero-heading"
            className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight"
          >
            Book Appointment <br /> With Trusted Doctors
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img
              className="w-28"
              src={assets.group_profiles}
              alt="Profile pictures of satisfied patients who have used our healthcare services"
              loading="lazy"
              decoding="async"
            />
            <p>
              Simply browse through our extensive list of trusted doctors,
              <br className="hidden sm:block" /> schedule your appointment
              hassle-free.
            </p>
          </div>

          <a
            href="#speciality"
            className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
            aria-describedby="book-appointment-description"
          >
            <span>Book appointment</span>
            <img
              className="w-3"
              src={assets.arrow_icon}
              alt="Right arrow icon"
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </a>

          <p id="book-appointment-description" className="sr-only">
            Navigate to the specialties section to find and book appointments
            with qualified doctors
          </p>
        </div>

        <div className="md:w-1/2 relative">
          <img
            className="w-full md:absolute bottom-0 h-auto rounded-lg"
            src={assets.header_img}
            alt="Professional healthcare team ready to provide medical consultations and appointments"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
