import { assets } from "../assets/assets";
import PageTitle from "../components/atoms/PageTitle";
import BenefitCard from "../components/molecules/BenefitCard";
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
      <main id="main-content" tabIndex="-1">
        <PageTitle normalText="ABOUT" boldText="US" />

        <section aria-labelledby="about-medimeet-heading">
          <div className="my-10 flex flex-col md:flex-row gap-12">
            <img
              className="w-full md:max-w-[360px] rounded-lg shadow-sm"
              src={assets.about_image}
              alt="Healthcare professionals using MediMeet platform to connect with patients and manage appointments"
              loading="lazy"
              decoding="async"
            />

            <div className="flex flex-col justify-center gap-6 md:w-3/5 text-sm text-gray-700">
              <p className="leading-relaxed">
                Welcome to MediMeet, your trusted partner in managing your
                healthcare needs conveniently and efficiently. At MediMeet, we
                understand the challenges individuals face when it comes to
                scheduling doctor appointments and managing their health
                records.
              </p>

              <p className="leading-relaxed">
                MediMeet is committed to excellence in healthcare technology. We
                continuously strive to enhance our platform, integrating the
                latest advancements to improve user experience and deliver
                superior service. Whether you are booking your first appointment
                or managing ongoing care, MediMeet is here to support you every
                step of the way.
              </p>

              <div className="mt-6">
                <h3 className="text-gray-800 font-bold text-lg mb-3">
                  Our Vision
                </h3>
                <p className="leading-relaxed">
                  Our vision at MediMeet is to create a seamless healthcare
                  experience for every user. We aim to bridge the gap between
                  patients and healthcare providers, making it easier for you to
                  access the care you need, when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="why-choose-us-heading">
          <h2
            id="why-choose-us-heading"
            className="text-xl font-semibold text-[#707070] my-8 text-start"
          >
            WHY <span className="text-gray-700">CHOOSE US</span>
          </h2>

          <div className="mb-20">
            <h3 className="sr-only">Our Key Benefits and Advantages</h3>

            <ul
              className="grid grid-cols-1 md:grid-cols-3"
              role="list"
              aria-label={`${BENEFITS.length} key benefits of choosing MediMeet`}
            >
              {BENEFITS.map(({ id, title, description }, index) => (
                <li
                  key={id}
                  role="listitem"
                  aria-label={`Benefit ${index + 1} of ${
                    BENEFITS.length
                  }: ${title}`}
                >
                  <BenefitCard
                    title={title}
                    description={description}
                    index={index + 1}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="cta-heading"
          className="bg-gray-50 py-16 px-6 rounded-lg mb-10"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2
              id="cta-heading"
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join thousands of patients who trust MediMeet for their healthcare
              needs. Experience the convenience of modern healthcare management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/login"
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none"
                aria-describedby="signup-description"
              >
                Create Account
              </a>
              <a
                href="/doctors"
                className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:outline-none"
                aria-describedby="browse-description"
              >
                Browse Doctors
              </a>
            </div>
            <p id="signup-description" className="sr-only">
              Sign up for a new MediMeet account to start booking appointments
            </p>
            <p id="browse-description" className="sr-only">
              Browse our directory of qualified healthcare professionals
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
