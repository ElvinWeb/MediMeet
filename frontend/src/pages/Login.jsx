import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";
import { loginSchema, signUpSchema } from "../validation/userValidationSchema";

const Login = () => {
  const { token, setToken } = useContext(AppContext);
  const [authMode, setAuthMode] = useState("signup");
  const navigate = useNavigate();
  const isSignUp = authMode === "signup";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isSignUp ? signUpSchema : loginSchema),
    mode: "all",
  });

  const handleAuthToggle = () => {
    setAuthMode((prev) => (prev === "signup" ? "login" : "signup"));
    reset();
  };

  const onAuthSubmit = async (data) => {
    try {
      if (isSignUp) {
        const res = await api.post(API_ENDPOINTS.USER.REGISTER, {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        if (res.data.success) {
          toast.success("Account created successfully. Please log in.");
          setAuthMode("login");
          reset();
        } else {
          toast.error(res.data.message || "Account creation failed.");
        }
      } else {
        const res = await api.post(API_ENDPOINTS.USER.LOGIN, {
          email: data.email,
          password: data.password,
        });

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          toast.success("Login successful.");
        } else {
          toast.error(res.data.message || "Invalid credentials.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onAuthSubmit)}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <h2 className="text-2xl font-semibold">
          {isSignUp ? "Create Account" : "Login"}
        </h2>
        <p>Please {isSignUp ? "sign up" : "log in"} to book appointment</p>

        {isSignUp && (
          <div className="w-full">
            <label>Full Name</label>
            <input
              {...register("name")}
              type="text"
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
            />
            <p className="text-red-500 text-xs">{errors.name?.message}</p>
          </div>
        )}

        <div className="w-full">
          <label>Email</label>
          <input
            {...register("email")}
            type="email"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        <div className="w-full">
          <label>Password</label>
          <input
            {...register("password")}
            type="password"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 my-2 rounded-md text-base"
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>

        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={handleAuthToggle}
            className="text-primary underline cursor-pointer"
          >
            {isSignUp ? "Login here" : "Sign up"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
