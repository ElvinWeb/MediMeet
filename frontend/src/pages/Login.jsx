import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(state === "Sign Up" ? signUpSchema : loginSchema),
    mode: "all",
  });

  const onSubmitHandler = async (data) => {
    try {
      if (state === "Sign Up") {
        const res = await axios.post(backendUrl + API_ENDPOINTS.USER.REGISTER, {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        if (res.data.success) {
          setState("Login");
          reset();
          toast.success("Account created successfully! Please log in.");
        } else {
          toast.error("Failed to create account. Please try again!");
        }
      } else {
        const res = await axios.post(backendUrl + API_ENDPOINTS.USER.LOGIN, {
          email: data.email,
          password: data.password,
        });

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          toast.success("Login successful!");
        } else {
          toast.error("Invalid email or password. Please try again!");
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later!");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              {...register("name")}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
            />
            <p className="text-red-500 text-xs">{errors.name?.message}</p>
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            {...register("email")}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            {...register("password")}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
          />
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
                reset();
              }}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
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
