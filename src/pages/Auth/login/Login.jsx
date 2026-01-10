import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import Card from "../../../components/Card/Card";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation()
  const navigate = useNavigate()
  const axiosInstance = useAxios()
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    console.log("Form Data: ", data);
    
    const res = await axiosInstance.get(`/checkUsers/${data.email}`)
    if (!res.data) {
      Swal.fire("Only registered users can logged in. Please register fist!");
      navigate('/register')
      return
    }  
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || '/')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-6 border border-base-300">
      <h3 className="text-3xl font-semibold text-center text-base-content">Welcome Back 👋</h3>
      <p className="text-center text-base-content/70">Please Login</p>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email */}
          <label className="label text-base-content">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input border-base-300 bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-error">Email is required</p>
          )}

          {/* password */}
          <label className="label text-base-content">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input border-base-300 bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-error">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-error">
              Password must be 6 characters or longer
            </p>
          )}

          <div>
            <a className="link link-hover text-primary">Forgot password?</a>
          </div>
          {/* <button className="btn btn-neutral mt-4">Login</button> */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
              w-full py-3 rounded-xl font-semibold text-primary-content
              bg-gradient-to-r from-primary to-secondary
              shadow-lg mt-4
            "
          >
            Login
          </motion.button>
        </fieldset>
        <p className="text-base-content">
          New to Digital Life Lessons? Please{" "}
          <Link
            state={location?.state}
            to="/register"
            className="text-primary hover:text-primary-focus"
          >
            Register
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
