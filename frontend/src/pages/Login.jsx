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
    formState: { errors, isSubmitting },
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
      
      {/* Skip to main content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content" role="main" className="min-h-[80vh] flex items-center" tabIndex="-1">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSubmit(onAuthSubmit)}
            className="min-h-[80vh] flex items-center"
            noValidate
            aria-labelledby="auth-heading"
            aria-describedby="auth-description"
          >
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-gray-700 text-sm shadow-lg">
              <header>
                <h1 id="auth-heading" className="text-2xl font-semibold text-gray-800">
                  {isSignUp ? "Create Account" : "Login"}
                </h1>
                <p id="auth-description" className="text-gray-600">
                  Please {isSignUp ? "sign up" : "log in"} to book appointment
                </p>
              </header>

              {/* Live region for form status */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
                role="status"
              >
                {isSubmitting &&
                  `${isSignUp ? "Creating account" : "Signing in"}...`}
              </div>

              {/* Form Fields */}
              <div className="w-full space-y-4">
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-600" aria-label="required">*</span>
                    </label>
                    <input
                      {...register("name")}
                      id="name"
                      type="text"
                      autoComplete="name"
                      className={`border rounded w-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      aria-describedby={errors.name ? "name-error" : "name-help"}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-required="true"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        className="text-red-600 text-xs mt-1"
                        aria-live="polite"
                      >
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`border rounded w-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    aria-describedby={errors.email ? "email-error" : "email-help"}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-required="true"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="text-red-600 text-xs mt-1"
                      aria-live="polite"
                    >
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    type="password"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    className={`border rounded w-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    aria-describedby={errors.password ? "password-error" : "password-help"}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-required="true"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p
                      id="password-error"
                      role="alert"
                      className="text-red-600 text-xs mt-1"
                      aria-live="polite"
                    >
                      {errors.password?.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 my-2 rounded-md text-base font-medium transition-all focus:outline-none ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-primary text-white"
                }`}
                aria-describedby="submit-status"
              >
                {isSubmitting
                  ? isSignUp
                    ? "Creating Account..."
                    : "Signing In..."
                  : isSignUp
                  ? "Create Account"
                  : "Login"}
              </button>

              <div className="w-full text-center">
                <p className="text-gray-700">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={handleAuthToggle}
                    className="text-blue-600 underline cursor-pointer bg-transparent border-none focus:outline-none rounded px-1"
                    aria-describedby="toggle-help"
                  >
                    {isSignUp ? "Login here" : "Sign up"}
                  </button>
                </p>
                <p id="toggle-help" className="text-xs text-gray-600 mt-1 sr-only">
                  Switch between login and signup forms
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;