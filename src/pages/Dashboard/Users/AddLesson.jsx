import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import usePremium from "../../../hooks/usePremium";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/lottie/success.json";

const image_hosting_key = import.meta.env.VITE_image_host;
const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const isPremiumUser = usePremium()
  console.log(isPremiumUser.isPremium)

  const [showLottie, setShowLottie] = useState(false);
  // const [isPremiumUser] = useState(user?.isPremium || false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Step1: Upload image to imgbb if included
      let imageURL = "";
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const res = await axios.post(image_upload_url, formData)

        if (res.data) { 
          imageURL = res.data.data.url;
          console.log(imageURL)
        }

        // const imgRes = await fetch(image_upload_url, {
        //   method: "POST",
        //   body: formData,
        // });
        // const imgData = await imgRes.json();
        // if (imgData.success) imageURL = imgData.data.display_url;
      }

      // Step2: Build final lesson object
      const lessonInfo = {
        title: data.title,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        category: data.category,
        emotionalTone: data.emotionalTone,
        visibility: data.visibility,
        accessLevel: data.accessLevel,
        featuredImageUrl: imageURL,
        creatorEmail: user.email,
        creatorName: user.displayName,
        creatorPhoto: user.photoURL,
        isReviewed: 'pending',
        isFeatured: 'no',
        likes: [],
        likesCount: 0,
        favorites: [],
        favoritesCount: 0,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Step3: Send to server
      const res = await axiosSecure.post("/lessons", lessonInfo);

      if (res.data.insertedId) {
        setShowLottie(true); // show Lottie animation
        setTimeout(() => setShowLottie(false), 5000); // hide after 2s
        Swal.fire({
          icon: "success",
          title: "Lesson Added Successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Adding Lesson",
        text: err.message,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-md rounded-lg relative border border-base-300">
      {showLottie && (
        <div className="absolute inset-0 bg-base-100 bg-opacity-80 flex items-center justify-center z-50">
          <Lottie animationData={successAnimation} loop={false} />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-base-content">Add New Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-semibold text-base-content">Lesson Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full border border-base-300 px-3 py-2 rounded bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="Enter lesson title"
          />
          {errors.title && (
            <p className="text-error text-sm">Title is required</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="font-semibold text-base-content">Short Description</label>
          <textarea
            {...register("shortDescription", { required: true })}
            className="w-full border border-base-300 px-3 py-2 rounded bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="A quick summary of the lesson"
          ></textarea>
        </div>

        {/* Full Description */}
        <div>
          <label className="font-semibold text-base-content">Full Description / Story</label>
          <textarea
            {...register("fullDescription", { required: true })}
            className="w-full border border-base-300 px-3 py-2 rounded h-40 bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="Write the full life lesson story here..."
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold text-base-content">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full border border-base-300 px-3 py-2 rounded bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Select category</option>
            <option>Personal Growth</option>
            <option>Career</option>
            <option>Relationships</option>
            <option>Mindset</option>
            <option>Mistakes Learned</option>
          </select>
        </div>

        {/* Emotional Tone */}
        <div>
          <label className="font-semibold text-base-content">Emotional Tone</label>
          <select
            {...register("emotionalTone", { required: true })}
            className="w-full border border-base-300 px-3 py-2 rounded bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Select tone</option>
            <option>Motivational</option>
            <option>Sad</option>
            <option>Realization</option>
            <option>Gratitude</option>
          </select>
        </div>

        {/* Visibility */}
        <div>
          <label className="font-semibold text-base-content">Visibility</label>
          <select
            {...register("visibility")}
            className="w-full border border-base-300 px-3 py-2 rounded bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Access Level (FREE / PREMIUM) */}
        <div>
          <label className="font-semibold text-base-content">Access Level</label>

          <select
            {...register("accessLevel")}
            disabled={!isPremiumUser.isPremium}
            className={`w-full border border-base-300 px-3 py-2 rounded focus:ring-2 focus:ring-primary/50 focus:border-primary ${
              !isPremiumUser.isPremium ? "bg-base-200 text-base-content/50 cursor-not-allowed" : "bg-base-100 text-base-content"
            }`}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>

          {!isPremiumUser.isPremium && (
            <p className="text-sm text-accent">
              Upgrade to Premium ⭐ to create premium lessons
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold text-base-content">Featured Image (optional)</label>
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="w-full border border-base-300 px-3 py-2 rounded bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-content hover:file:bg-primary-focus"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary text-primary-content px-5 py-2 rounded hover:btn-primary-focus"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
