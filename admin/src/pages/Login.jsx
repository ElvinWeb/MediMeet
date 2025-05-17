import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { API_ENDPOINTS, BACKEND_URL } from "../constants/apiEndpoints";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (formData) => {
    try {
      const endpoint =
        state === "Admin"
          ? API_ENDPOINTS.ADMIN.LOGIN
          : API_ENDPOINTS.DOCTOR.LOGIN;

      const { data } = await axios.post(BACKEND_URL + endpoint, formData);

      if (data.success) {
        if (state === "Admin") {
          setAToken(data.token);
          localStorage.setItem("aToken", data.token);
          navigate("/admin-dashboard");
          toast.success("Admin login successful!");
        } else {
          setDToken(data.token);
          localStorage.setItem("dToken", data.token);
          navigate("/doctor-dashboard");
          toast.success("Doctor login successful!");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            {...register("email")}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            placeholder="Enter your email"
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            {...register("password")}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            placeholder="Enter your password"
          />
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => {
                setState("Doctor");
                reset(); // reset form when switching
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => {
                setState("Admin");
                reset();
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
