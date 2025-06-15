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
    formState: { errors, isSubmitting },
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
        toast.error(data.message || "Login failed");
        return;
      }

      const tokenKey = isAdmin ? "aToken" : "dToken";
      const dashboardRoute = isAdmin ? "/admin-dashboard" : "/doctor-dashboard";

      sessionStorage.setItem(tokenKey, data.token);
      isAdmin ? setAToken(data.token) : setDToken(data.token);
      navigate(dashboardRoute);
      toast.success(`${userType} login successful!`);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login.");
    }
  };

  const handleUserTypeToggle = () => {
    setUserType(isAdmin ? "Doctor" : "Admin");
    reset();
  };

  return (
    <>
      <main
        id="main-content"
        className="min-h-[80vh] flex items-center"
        tabIndex="-1"
      >
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="min-h-[80vh] flex items-center w-full"
          noValidate
          aria-labelledby="login-heading"
          aria-describedby="login-description"
        >
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border bg-[#FFF] border-gray-300 rounded-xl text-gray-700 text-sm shadow-lg">
            <header className="w-full text-center">
              <h1
                id="login-heading"
                className="text-2xl font-semibold text-gray-800"
              >
                <span className="text-primary">{userType}</span> Login
              </h1>
              <p id="login-description" className="sr-only">
                Sign in to access your {userType.toLowerCase()} dashboard
              </p>
            </header>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
              role="status"
            >
              {isSubmitting && `Signing in as ${userType}...`}
            </div>

            <div className="w-full space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className={`border rounded w-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  aria-describedby={errors.email ? "email-error" : "email-help"}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-required="true"
                />
                
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-red-600 text-xs mt-1"
                    aria-live="polite"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password{" "}
                  <span className="text-red-600" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`border rounded w-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  aria-describedby={
                    errors.password ? "password-error" : "password-help"
                  }
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-required="true"
                />
                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="text-red-600 text-xs mt-1"
                    aria-live="polite"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-md text-base font-medium transition-all focus:outline-none ${
                isSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-primary text-white"
              }`}
              aria-describedby="submit-help"
            >
              {isSubmitting ? `Signing in...` : `Login as ${userType}`}
            </button>

            <div className="text-center w-full">
              <p className="text-gray-700">
                {isAdmin ? "Doctor" : "Admin"} Login?{" "}
                <button
                  type="button"
                  onClick={handleUserTypeToggle}
                  className="text-primary underline cursor-pointer bg-transparent border-none focus:outline-none rounded px-1"
                  aria-describedby="toggle-help"
                >
                  Click here
                </button>
              </p>
              <p
                id="toggle-help"
                className="text-xs text-gray-600 mt-1 sr-only"
              >
                Switch between {isAdmin ? "Doctor" : "Admin"} and{" "}
                {isAdmin ? "Admin" : "Doctor"} login forms
              </p>
            </div>

            <div className="sr-only">
              <p>Currently set to {userType} login mode.</p>
              <p>
                Fill in your credentials and click Login to access your
                dashboard.
              </p>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
