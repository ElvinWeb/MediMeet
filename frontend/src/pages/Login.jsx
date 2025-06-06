import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AppContext } from "../context/AppContext";
import api from "../utils/api";
import { loginSchema, signUpSchema } from "../validation/userValidationSchema";
import SEOHelmet from "../components/SEO/SEOHelmet";

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
    <>
      <SEOHelmet
        title={
          isSignUp ? "Create Account - Join MediMeet" : "Login to MediMeet"
        }
        description={
          isSignUp
            ? "Create your MediMeet account to book doctor appointments online. Join thousands of patients managing their healthcare digitally."
            : "Login to your MediMeet account to manage appointments, view medical records, and access healthcare services online."
        }
        keywords={
          isSignUp
            ? "create account medimeet, register patient, healthcare account, medical platform signup"
            : "medimeet login, patient portal, healthcare login, medical platform access"
        }
      />
      <form
        onSubmit={handleSubmit(onAuthSubmit)}
        className="min-h-[80vh] flex items-center"
        noValidate
        aria-label={isSignUp ? "Create new account" : "Sign in to your account"}
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <h2 className="text-2xl font-semibold">
            {isSignUp ? "Create Account" : "Login"}
          </h2>
          <p>Please {isSignUp ? "sign up" : "log in"} to book appointment</p>

          {isSignUp && (
            <div className="w-full">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={errors.name ? "true" : "false"}
                aria-required="true"
              />
              <p id="name-error" role="alert" className="text-red-500 text-xs">
                {errors.name?.message}
              </p>
            </div>
          )}

          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={errors.email ? "true" : "false"}
              aria-required="true"
            />
            <p id="email-error" role="alert" className="text-red-500 text-xs">
              {errors.email?.message}
            </p>
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={errors.password ? "true" : "false"}
              aria-required="true"
            />
            <p
              id="password-error"
              role="alert"
              className="text-red-500 text-xs"
            >
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full py-2 my-2 rounded-md text-base"
            aria-label={isSignUp ? "Create new account" : "Sign in to account"}
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>

          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={handleAuthToggle}
              className="text-primary underline cursor-pointer bg-transparent border-none"
              aria-label={
                isSignUp ? "Switch to login form" : "Switch to signup form"
              }
            >
              {isSignUp ? "Login here" : "Sign up"}
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
