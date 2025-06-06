import SEOHelmet from "../components/SEO/SEOHelmet";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHelmet
        title="Privacy Policy - Your Data Protection Rights"
        description="Learn how MediMeet protects your personal and medical information. Our comprehensive privacy policy explains data collection, usage, security measures, and your rights."
        keywords="privacy policy, data protection, medical privacy, healthcare data security, patient rights, HIPAA compliance"
      />
      <div className="min-h-screen py-10">
        <div className="text-center text-3xl font-bold text-[#707070] tracking-wide mb-8">
          <h1>
            PRIVACY <span className="text-gray-700 font-extrabold">POLICY</span>
          </h1>
        </div>

        <main className="w-full mx-auto bg-white rounded-md shadow-lg px-8 py-10">
          <p className="mb-6 text-md text-gray-500">
            <strong className="text-gray-700">Last Updated:</strong> May 13,
            2025
          </p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-700">
              Welcome to{" "}
              <span className="font-semibold text-primary">MediMeet</span>. Your
              privacy is important to us. This Privacy Policy explains how we
              collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                <strong>Personal Info:</strong> Name, email, phone, date of
                birth.
              </li>
              <li>
                <strong>Health Info:</strong> Appointment records, medical
                history.
              </li>
              <li>
                <strong>Technical Info:</strong> IP address, browser type,
                device data.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use your data to manage appointments, communicate updates,
              personalize your experience, ensure security, and comply with
              legal requirements.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-700">
              We may share your data with healthcare providers, service
              partners, or authorities when legally required. We do not sell
              your data.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              5. Data Security
            </h2>
            <p className="text-gray-700">
              We use encryption, secure servers, and internal policies to
              protect your data. However, no system is completely immune to
              threats.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              6. Your Rights
            </h2>
            <p className="text-gray-700">
              You have the right to access, update, or delete your data, and to
              withdraw consent. Contact us to request these actions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              7. Data Retention
            </h2>
            <p className="text-gray-700">
              We retain your information only as long as necessary to fulfill
              service purposes or comply with legal obligations.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              8. Third-Party Links
            </h2>
            <p className="text-gray-700">
              We are not responsible for the privacy policies of external
              websites linked from MediMeet.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              9. Children’s Privacy
            </h2>
            <p className="text-gray-700">
              MediMeet is not designed for children under 13. We do not
              knowingly collect data from minors without consent.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-primary mb-2">
              10. Updates to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this policy. Please review it regularly. Changes
              will be reflected on this page with the date above.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
