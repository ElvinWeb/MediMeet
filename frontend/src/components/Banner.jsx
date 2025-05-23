import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Banner = () => {
  const navigate = useNavigate();
  const { token, userData } = useContext(AppContext);

  return (
    <div className="flex bg-primary rounded-lg pt-4 px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10">
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
          <p>
            {token && userData ? "Browse Through Appointments" : "Create Account For Book Appointment"}
          </p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        {token && userData ? (
          <button
            onClick={() => {
              navigate("/my-appointments");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all "
          >
            Browse appointments
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all "
          >
            Create account
          </button>
        )}
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-[330px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
