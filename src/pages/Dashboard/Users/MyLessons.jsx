import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import usePremium from '../../../hooks/usePremium';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const detailsModalRef = useRef(null);
  const editDetailsModalRef = useRef(null)
  const [particularLesson, setParticularLesson] = useState(null)
  const { isPremium } = usePremium()
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

  const image_hosting_key = import.meta.env.VITE_image_host;
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // Fetch lessons created by user
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["my-lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Toggle visibility
  const handleToggleVisibility = async (lessonId, currentVisibility) => {
    const newVisibility = currentVisibility === "public" ? "private" : "public";
    await axiosSecure.patch(`/lessons/${lessonId}/visibility`, {
      visibility: newVisibility,
    });
    queryClient.invalidateQueries(["my-lessons", user?.email]);
  };

  // Toggle access level (only for premium users)
  const handleToggleAccess = async (lessonId, currentAccess) => {
    if (!isPremium) {
      Swal.fire("Only premium users can change access level!");
      return;
    }
    const newAccess = currentAccess === "free" ? "premium" : "free";
    await axiosSecure.patch(`/lessons/${lessonId}/access`, {
      accessLevel: newAccess,
    });
    queryClient.invalidateQueries(["my-lessons", user?.email]);
  };

  // Show Details 
  const handleShowDetails = async (lessonId) => {
    const data = lessons.find(lesson => lesson._id === lessonId)
    // console.log(data)
    setParticularLesson(data)
    detailsModalRef.current.showModal()
  }

  // Edit Details
  const handleEditLesson = async (lessonId) => {
    const data = lessons.find((lesson) => lesson._id === lessonId);
    setParticularLesson(data);
    editDetailsModalRef.current.showModal()
  }
  
  const handleUpdateLesson = async (formData) => {
    try {
      let imageURL = particularLesson.featuredImageUrl; 
      console.log(imageURL)

      // Upload new image
      if (formData.image && formData.image.length > 0) {
        const fd = new FormData();
        fd.append("image", formData.image[0]);

        const res = await axios.post(image_upload_url, fd);
        imageURL = res.data.data.url;
      }

      const updatedLesson = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        category: formData.category,
        emotionalTone: formData.emotionalTone,
        visibility: formData.visibility,
        accessLevel: formData.accessLevel,
        featuredImageUrl: imageURL,
        updatedAt: new Date(),
      };

      const res = await axiosSecure.patch(`/lessons/${particularLesson._id}`, updatedLesson);
      console.log(res.data)

      if (res.data.modifiedCount === 1) {
        Swal.fire("Updated!", "Lesson updated successfully.", "success");
        editDetailsModalRef.current.close();
        reset();
      }

      queryClient.invalidateQueries(["my-lessons", user?.email]);

    } 
    catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  
  // Delete lesson
  const handleDeleteLesson = async (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/lessons/${lessonId}`);
        queryClient.invalidateQueries(["my-lessons", user?.email]);
        Swal.fire("Deleted!", "Lesson has been removed.", "success");
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 text-base-content">My Lessons</h2>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-lg shadow border border-base-300">
        <table className="table w-full bg-base-100">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th className="px-4 py-3">Thumbnail</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3">Access</th>
              <th className="px-4 py-3">Reactions</th>
              <th className="px-4 py-3">Saves</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td className="px-4 py-3">
                  <img
                    src={
                      lesson.featuredImageUrl ||
                      "https://via.placeholder.com/50"
                    }
                    alt={lesson.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3 max-w-[200px] truncate">{lesson.title}</td>
                <td className="px-4 py-3">{lesson.category}</td>
                <td className="px-4 py-3">
                  <button
                    className={`btn btn-sm btn-outline ${
                      lesson.visibility === "public"
                        ? "btn-success"
                        : "btn-warning"
                    }`}
                    onClick={() =>
                      handleToggleVisibility(lesson._id, lesson.visibility)
                    }
                  >
                    {lesson.visibility}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    className={`btn btn-sm btn-outline ${
                      lesson.accessLevel === "free"
                        ? "btn-info"
                        : "btn-secondary"
                    }`}
                    onClick={() =>
                      handleToggleAccess(lesson._id, lesson.accessLevel)
                    }
                  >
                    {lesson.accessLevel}
                  </button>
                </td>
                <td className="px-4 py-3">{lesson.likesCount || 0}</td>
                <td className="px-4 py-3">{lesson.favoritesCount || 0}</td>
                <td className="px-4 py-3">{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">{lesson.isReviewed}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleShowDetails(lesson._id)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEditLesson(lesson._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteLesson(lesson._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-8 text-base-content/70">
                  You have not created any lessons yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {lessons.length === 0 ? (
          <div className="text-center py-8 bg-base-100 rounded-lg shadow border border-base-300">
            <p className="text-base-content/70">You have not created any lessons yet.</p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <div key={lesson._id} className="bg-base-100 rounded-lg shadow-md p-4 space-y-3 border border-base-300">
              {/* Header with image and title */}
              <div className="flex gap-3">
                <img
                  src={lesson.featuredImageUrl || "https://via.placeholder.com/50"}
                  alt={lesson.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    {lesson.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`btn btn-xs ${
                        lesson.visibility === "public"
                          ? "btn-success"
                          : "btn-warning"
                      }`}
                      onClick={() =>
                        handleToggleVisibility(lesson._id, lesson.visibility)
                      }
                    >
                      {lesson.visibility}
                    </button>
                    <button
                      className={`btn btn-xs ${
                        lesson.accessLevel === "free"
                          ? "btn-info"
                          : "btn-secondary"
                      }`}
                      onClick={() =>
                        handleToggleAccess(lesson._id, lesson.accessLevel)
                      }
                    >
                      {lesson.accessLevel}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-2 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Reactions</div>
                  <div className="font-semibold text-sm">{lesson.likesCount || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Saves</div>
                  <div className="font-semibold text-sm">{lesson.favoritesCount || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="font-semibold text-xs">{lesson.isReviewed}</div>
                </div>
              </div>

              {/* Date and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Created: {new Date(lesson.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-xs btn-secondary flex-1 sm:flex-none"
                    onClick={() => handleShowDetails(lesson._id)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-xs btn-warning flex-1 sm:flex-none"
                    onClick={() => handleEditLesson(lesson._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error flex-1 sm:flex-none"
                    onClick={() => handleDeleteLesson(lesson._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
        {/* Details Modal */}
        <dialog ref={detailsModalRef} className="modal modal-middle">
          {particularLesson && (
            <div className="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="border-b pb-3 md:pb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {particularLesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700">
                  {particularLesson.category} • Created by{" "}
                  {particularLesson.creatorName}
                </p>
              </div>

              {/* Descriptions */}
              <div className="space-y-3 md:space-y-4">
                <p className="text-sm sm:text-base text-gray-700 font-semibold">
                  {particularLesson.shortDescription}
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {particularLesson.fullDescription}
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {/* Stat Item */}
                <div className="p-3 md:p-4 bg-blue-100 rounded-lg md:rounded-xl shadow-sm text-center">
                  <h3 className="text-xs sm:text-sm text-gray-700 font-semibold mb-1">Views</h3>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    {particularLesson.views}
                  </p>
                </div>

                <div className="p-3 md:p-4 bg-blue-100 rounded-lg md:rounded-xl shadow-sm text-center">
                  <h3 className="text-xs sm:text-sm text-gray-700 font-semibold mb-1">
                    Liked By
                  </h3>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    {particularLesson.likesCount}
                  </p>
                </div>

                <div className="p-3 md:p-4 bg-blue-100 rounded-lg md:rounded-xl shadow-sm text-center">
                  <h3 className="text-xs sm:text-sm text-gray-700 font-semibold mb-1">
                    Favorites
                  </h3>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    {particularLesson.favoritesCount}
                  </p>
                </div>

                <div className="p-3 md:p-4 bg-blue-100 rounded-lg md:rounded-xl shadow-sm text-center">
                  <h3 className="text-xs sm:text-sm text-gray-700 font-semibold mb-1">
                    Reports
                  </h3>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    {particularLesson.reportsCount}
                  </p>
                </div>
              </div>

              {/* Modal Close Button */}
              <div className="modal-action pt-4">
                <form method="dialog">
                  <button className="btn btn-primary w-full sm:w-auto">Close</button>
                </form>
              </div>
            </div>
          )}
        </dialog>
        <dialog ref={editDetailsModalRef} className="modal modal-middle">
          {particularLesson && (
            <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 md:mb-6">Edit Lesson</h2>

              <form
                onSubmit={handleSubmit(handleUpdateLesson)}
                className="space-y-4 md:space-y-6"
              >
                {/* Title */}
                <div>
                  <label className="font-semibold">Lesson Title</label>
                  <input
                    {...register("title", { required: true })}
                    defaultValue={particularLesson.title}
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="font-semibold">Short Description</label>
                  <textarea
                    {...register("shortDescription", { required: true })}
                    defaultValue={particularLesson.shortDescription}
                    className="w-full border px-3 py-2 rounded"
                  ></textarea>
                </div>

                {/* Full Description */}
                <div>
                  <label className="font-semibold">Full Description</label>
                  <textarea
                    {...register("fullDescription", { required: true })}
                    defaultValue={particularLesson.fullDescription}
                    className="w-full border px-3 py-2 rounded h-40"
                  ></textarea>
                </div>

                {/* Category */}
                <div>
                  <label className="font-semibold">Category</label>
                  <select
                    {...register("category", { required: true })}
                    defaultValue={particularLesson.category}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Personal Growth">Personal Growth</option>
                    <option value="Career">Career</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Mindset">Mindset</option>
                    <option value="Mistakes Learned">Mistakes Learned</option>
                  </select>
                </div>

                {/* Emotional Tone */}
                <div>
                  <label className="font-semibold">Emotional Tone</label>
                  <select
                    {...register("emotionalTone", { required: true })}
                    defaultValue={particularLesson.emotionalTone}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Motivational">Motivational</option>
                    <option value="Sad">Sad</option>
                    <option value="Realization">Realization</option>
                    <option value="Gratitude">Gratitude</option>
                  </select>
                </div>

                {/* Visibility */}
                <div>
                  <label className="font-semibold">Visibility</label>
                  <select
                    {...register("visibility")}
                    defaultValue={particularLesson.visibility}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                {/* Access Level */}
                <div>
                  <label className="font-semibold">Access Level</label>
                  <select
                    {...register("accessLevel")}
                    defaultValue={particularLesson.accessLevel}
                    disabled={!isPremium}
                    className={`w-full border px-3 py-2 rounded ${
                      !isPremium ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>

                  {!isPremium && (
                    <p className="text-xs text-blue-400 mt-1">
                      Upgrade to Premium ⭐ to create premium lessons.
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="font-semibold">Featured Image</label>
                  <input
                    {...register("image")}
                    type="file"
                    accept="image/*"
                    className="w-full border px-3 py-2 rounded"
                  />

                  <img
                    src={particularLesson.featuredImageUrl}
                    className="w-32 mt-2 rounded border"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      editDetailsModalRef.current.close();
                      reset();
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary">
                    Update Lesson
                  </button>
                </div>
              </form>
            </div>
          )}
        </dialog>
      </div>
  );
};

export default MyLessons;