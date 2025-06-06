import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import BannerButton from "../atoms/BannerButton";

const Banner = () => {
  const { token, userData } = useContext(AppContext);

  return (
    <section aria-labelledby="Banner Panel">
      <div className="flex bg-primary rounded-lg pt-4 px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10">
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            <p>
              {token && userData
                ? "Browse Through Your Appointments"
                : "Create Account For Book Appointment"}
            </p>
            <p className="mt-4">With 100+ Trusted Doctors</p>
          </div>
          {token && userData ? (
            <BannerButton
              path="/my-appointments"
              content="Browse appointments"
            />
          ) : (
            <BannerButton path="/login" content="Create account" />
          )}
        </div>

        <div className="hidden md:block md:w-1/2 lg:w-[330px] relative">
          <img
            className="w-full absolute bottom-0 right-0 max-w-md"
            src={assets.appointment_img}
            alt="Appointment Banner Image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
