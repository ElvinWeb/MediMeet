import { assets } from "../assets/assets";
import PageTitle from "../components/atoms/PageTitle";
import SEOHelmet from "../components/SEO/SEOHelmet";

const Contact = () => {
  return (
    <>
      <SEOHelmet
        title="Contact MediMeet"
        description="Contact MediMeet for support and inquiries. Located in Baku, Azerbaijan. Call +99450-515-50-55 or email support@medimeet.com"
        keywords="contact medimeet, customer support, healthcare support, medimeet office Baku"
      />

      <main>
        <PageTitle normalText="CONTACT" boldText="US" />

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
          <img
            className="w-full md:max-w-[360px]"
            src={assets.contact_image}
            alt="MediMeet Office Contact Information"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-center items-start gap-6">
            <section aria-labelledby="office-info">
              <h2
                id="office-info"
                className="font-semibold text-lg text-gray-600"
              >
                OUR OFFICE
              </h2>
              <address className="text-gray-500 mt-3">
                23 Akademik Zahid Khalilov Street <br />
                Yasamal District, Baku, Azerbaijan
              </address>
              <div className="text-gray-500 mt-3">
                <p>
                  Tel:{" "}
                  <a
                    href="tel:+99450515550"
                    className="text-gray-500 hover:underline focus:underline focus:outline-none"
                    aria-label="Call MediMeet office"
                  >
                    +99450-515-50-55
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@medimeet.com"
                    className="text-gray-500 hover:underline focus:underline focus:outline-none"
                    aria-label="Email MediMeet support"
                  >
                    support@medimeet.com
                  </a>
                </p>
              </div>
            </section>

            <section aria-labelledby="careers-info">
              <h2
                id="careers-info"
                className="font-semibold text-lg text-gray-600"
              >
                CAREERS AT MediMeet
              </h2>
              <p className="text-gray-500 mt-3">
                Learn more about our teams and job openings.
              </p>
              <button
                className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white focus:bg-black focus:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-500 mt-4"
                aria-label="Explore job opportunities at MediMeet"
                type="button"
              >
                Explore Jobs
              </button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
