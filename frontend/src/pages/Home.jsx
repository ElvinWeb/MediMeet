import Header from "../components/organisms/Header";
import SpecialityMenu from "../components/organisms/SpecialityMenu";
import TopDoctors from "../components/organisms/TopDoctors";
import Banner from "../components/organisms/Banner";
import SEOHelmet from "../components/SEO/SEOHelmet";

const Home = () => {
  return (
    <>
      <SEOHelmet
        title="MediMeet - Online Doctor Appointment Booking"
        description="Book doctor appointments online with MediMeet. Find qualified healthcare professionals, schedule consultations, and manage your healthcare needs conveniently."
        keywords="doctor appointment, online booking, healthcare, medical consultation, doctors"
      />
      <main
        id="main-content"
        role="main"
        aria-label="MediMeet homepage content"
      >
        <Header />
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
      </main>
    </>
  );
};

export default Home;
