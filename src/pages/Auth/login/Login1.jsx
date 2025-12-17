import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import Card from "../../../components/Card/Card";
import { motion } from "framer-motion";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const res = await axiosInstance.get(`/users/${data.email}`);
    if (!res.data) {
      Swal.fire("Only registered users can logged in. Please register fist!");
      navigate("/register");
      return;
    }

    signInUser(data.email, data.password)
      .then(() => navigate(location?.state || "/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          w-full max-w-md rounded-2xl
          bg-white/70 dark:bg-gray-900/70
          backdrop-blur-xl
          shadow-2xl
          border border-white/30 dark:border-gray-700
        "
      >
        {/* Header */}
        <div className="p-8 pb-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back 👋
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Please login to your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="px-8 pb-6 space-y-4"
        >
          {/* Email */}
          <div>
            <label className="label text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="
                input input-bordered w-full rounded-xl
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-[#0061ff]
              "
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="
                input input-bordered w-full rounded-xl
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-[#bf0fff]
              "
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <a className="text-sm text-[#bf0fff] hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-[#bf0fff] to-[#ff1b6b]
              shadow-lg
            "
          >
            Login
          </motion.button>
        </form>

        {/* Divider */}
        <div className="px-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Social login */}
        <div className="px-8 py-4">
          <SocialLogin />
        </div>

        {/* Footer */}
        <div className="pb-6 text-center text-sm text-gray-600 dark:text-gray-400">
          New to ZapShift?{" "}
          <Link
            state={location?.state}
            to="/register"
            className="text-[#0061ff] font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
