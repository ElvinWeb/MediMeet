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
            alt="MediMeet office contact information"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-center items-start gap-6">
            <h2 className=" font-semibold text-lg text-gray-600">OUR OFFICE</h2>
            <p className=" text-gray-500">
              23 Akademik Zahid Khalilov Street <br /> Yasamal District, Baku,
              Azerbaijan
            </p>
            <p className=" text-gray-500">
              Tel: +99450-515-50-55 <br /> Email: support@medimeet.com
            </p>
            <h2 className="font-semibold text-lg text-gray-600">
              CAREERS AT MediMeet
            </h2>
            <p className=" text-gray-500">
              Learn more about our teams and job openings.
            </p>
            <button
              className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
              aria-label="Explore job opportunities at MediMeet"
              type="button"
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
