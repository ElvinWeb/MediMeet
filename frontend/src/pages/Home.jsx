import Header from "../components/organisms/Header";
import SpecialityMenu from "../components/organisms/SpecialityMenu";
import TopDoctors from "../components/organisms/TopDoctors";
import Banner from "../components/organisms/Banner";

const Home = () => {
  return (
    <main role="main">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </main>
  );
};

export default Home;
