import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const axiosInstance = useAxios()

  const handleRegistration = async (data) => {
    console.log(data);
    const res = await axiosInstance.get(`/checkUsers/${data.email}`)
    console.log(res)
    if (res.data) {
      Swal.fire("You are already registered. Please login!");
      navigate('/login')
      return
    } 
    const profileImage = data.photo[0]

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user)

        // 1. store the image in form data
        const formData = new FormData()
        formData.append('image', profileImage)

        // 2. send the photo to store and get url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
        axios.post(image_API_URL, formData)
          .then(res => {
            // console.log("After Image Upload", res, res.data.data.url);

            // Create user profile in database
            const photoURL = res.data.data.url
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,

            }
            axiosSecure.post('/users', userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  console.log('user created in db')
                }
              })

            // 3. update user profile
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };
            updateUserProfile(userProfile)
              .then(() => {
                // console.log('User Profile Updated')
                navigate(location?.state || '/')
              })
              .catch(e => console.log(e))
          })
          .catch(e => console.log(e.message))
        })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-base-300">
      <h3 className="text-3xl font-semibold text-center text-base-content">
        Welcome to Digital Life Lessons
      </h3>
      <p className="text-center text-base-content/70">Please Register</p>
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label text-base-content">Name</label>
          <input
            type="name"
            {...register("name", { required: true })}
            className="input border-base-300 bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-error">Name is required</p>
          )}

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

          {/* Image */}
          <label className="label text-base-content">Image</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input border-base-300 bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-content hover:file:bg-primary-focus"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-error">Photo is required</p>
          )}

          {/* password */}
          <label className="label text-base-content">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            })}
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
          {errors.password?.type === "pattern" && (
            <p className="text-error">
              Password must have at least one lowercase, one uppercase and one
              special character
            </p>
          )}
          <button className="btn btn-primary mt-4 text-primary-content">Register</button>
        </fieldset>
        <p className="text-base-content">
          Already have an account? Please{" "}
          <Link state={location.state} to="/login" className="text-primary hover:text-primary-focus">
            Login
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;
