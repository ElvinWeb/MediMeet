import { Link } from "react-router-dom";
import { specialityData } from "../../assets/assets";
import SectionTitle from "../atoms/SectionTitle";

const SpecialityMenu = () => {
  return (
    <section aria-labelledby="specialities-heading">
      <div
        id="speciality"
        className="flex flex-col items-center gap-4 py-16 text-gray-700"
      >
        <SectionTitle
          title="Find by Speciality"
          subtitle="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free."
          headingId="specialities-heading"
        />

        <nav aria-labelledby="specialities-nav-heading" className="w-full">
          <h3 id="specialities-nav-heading" className="sr-only">
            Browse medical specialties
          </h3>

          <ul
            className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto pb-2"
            role="list"
            aria-label="Medical specialties navigation"
          >
            {specialityData.map((item, index) => (
              <li key={index} role="listitem" className="flex-shrink-0">
                <Link
                  to={`/doctors/${item.speciality}`}
                  onClick={() => scrollTo(0, 0)}
                  className="flex flex-col items-center text-xs cursor-pointer hover:translate-y-[-10px] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
                  aria-label={`Browse ${item.speciality} doctors`}
                >
                  <img
                    className="w-16 sm:w-24 mb-2"
                    src={item.image}
                    alt={`${item.speciality} medical specialty icon`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-center font-medium">
                    {item.speciality}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default SpecialityMenu;
