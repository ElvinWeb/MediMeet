import { assets } from "../assets/assets";
import PageTitle from "../components/atoms/PageTitle";

const Contact = () => {
  return (
    <div>
      <PageTitle normalText="CONTACT" boldText="US" />

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt="MediMeet office contact information"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <h3 className=" font-semibold text-lg text-gray-600">OUR OFFICE</h3>
          <p className=" text-gray-500">
            23 Akademik Zahid Khalilov Street <br /> Yasamal District, Baku,
            Azerbaijan
          </p>
          <p className=" text-gray-500">
            Tel: +99450-515-50-55 <br /> Email: support@medimeet.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            CAREERS AT MediMeet
          </p>
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
    </div>
  );
};

export default Contact;
