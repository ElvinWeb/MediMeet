import { assets } from "../assets/assets";
import PageTitle from "../components/atoms/PageTitle";
import BenefitCard from "../components/atoms/BenefitCard";
import { BENEFITS } from "../constants/benefitsConstants";
import SEOHelmet from "../components/SEO/SEOHelmet";

const About = () => {
  return (
    <>
      <SEOHelmet
        title="About MediMeet"
        description="Learn about MediMeet's mission to revolutionize healthcare access in globally. Discover our vision, values, and commitment to connecting patients with quality healthcare providers."
        keywords="about medimeet, healthcare platform, medical platform, healthcare innovation"
      />
      <main>
        <PageTitle normalText="ABOUT" boldText="US" />

        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img
            className="w-full md:max-w-[360px]"
            src={assets.about_image}
            alt="About MediMeet healthcare platform"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
            <p>
              Welcome to MediMeet, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At MediMeet, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p>
              MediMeet is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you are booking your first appointment
              or managing ongoing care, MediMeet is here to support you every
              step of the way.
            </p>
            <b className="text-gray-800">Our Vision</b>
            <p>
              Our vision at MediMeet is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>

        <section aria-labelledby="why-choose-us">
          <div className="text-xl my-4">
            <p>
              WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row mb-20">
            {BENEFITS.map(({ id, title, description }) => (
              <BenefitCard key={id} title={title} description={description} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
