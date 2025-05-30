import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import api from "../utils/api";
import { loginValidationSchema } from "../validation/loginValidationSchema";

const Login = () => {
  const [userType, setUserType] = useState("Admin");
  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const isAdmin = userType === "Admin";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: { email: "", password: "" },
    mode: "all",
  });

  const endpoint = useMemo(() => {
    return isAdmin ? API_ENDPOINTS.ADMIN.LOGIN : API_ENDPOINTS.DOCTOR.LOGIN;
  }, [isAdmin]);

  const handleLogin = async (formData) => {
    try {
      const { data } = await api.post(endpoint, formData);

      if (!data.success) {
        return toast.error(data.message || "Login failed");
      }

      console.log("formData:", formData);

      const tokenKey = isAdmin ? "aToken" : "dToken";
      const dashboardRoute = isAdmin ? "/admin-dashboard" : "/doctor-dashboard";

      localStorage.setItem(tokenKey, data.token);
      isAdmin ? setAToken(data.token) : setDToken(data.token);
      navigate(dashboardRoute);
      toast.success(`${userType} login successful!`);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{userType}</span> Login
        </p>

        <div className="w-full">
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>

        <p className="text-center w-full">
          {isAdmin ? "Doctor" : "Admin"} Login?{" "}
          <span
            onClick={() => {
              setUserType(isAdmin ? "Doctor" : "Admin");
              reset();
            }}
            className="text-primary underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
