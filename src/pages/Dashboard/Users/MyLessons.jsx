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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Lessons</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Reactions</th>
              <th>Saves</th>
              <th>Created</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>
                  <img
                    src={
                      lesson.featuredImageUrl ||
                      "https://via.placeholder.com/50"
                    }
                    alt={lesson.title}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td>{lesson.title}</td>
                <td>{lesson.category}</td>
                <td>
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
                <td>
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
                <td>{lesson.likesCount || 0}</td>
                <td>{lesson.favoritesCount || 0}</td>
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td>{lesson.isReviewed}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={
                      () => handleShowDetails(lesson._id)
                      // window.location.assign(`/dashboard/lessons/${lesson._id}`)
                    }
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
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  You have not created any lessons yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Details Modal */}
        <dialog ref={detailsModalRef} className="modal modal-middle">
          {particularLesson && (
            <div className="modal-box space-y-6">
              {/* Header */}
              <div className="border-b pb-3">
                <h3 className="text-2xl font-bold text-gray-800">
                  {particularLesson.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  {particularLesson.category} • Created by{" "}
                  {particularLesson.creatorName}
                </p>
              </div>

              {/* Descriptions */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">
                  {particularLesson.shortDescription}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {particularLesson.fullDescription}
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {/* Stat Item */}
                <div className="p-4 bg-blue-100 rounded-xl shadow-sm text-center">
                  <h3 className="text-sm text-gray-700 font-semibold">Views</h3>
                  <p className="text-xl font-bold text-gray-800">
                    {particularLesson.views}
                  </p>
                </div>

                <div className="p-4 bg-blue-100 rounded-xl shadow-sm text-center">
                  <h3 className="text-sm text-gray-700 font-semibold">
                    Liked By
                  </h3>
                  <p className="text-xl font-bold text-gray-800">
                    {particularLesson.likesCount}
                  </p>
                </div>

                <div className="p-4 bg-blue-100 rounded-xl shadow-sm text-center">
                  <h3 className="text-sm text-gray-700 font-semibold">
                    Favorites
                  </h3>
                  <p className="text-xl font-bold text-gray-800">
                    {particularLesson.favoritesCount}
                  </p>
                </div>

                <div className="p-4 bg-blue-100 rounded-xl shadow-sm text-center">
                  <h3 className="text-sm text-gray-700 font-semibold">
                    Reports
                  </h3>
                  <p className="text-xl font-bold text-gray-800">
                    {particularLesson.reportsCount}
                  </p>
                </div>
              </div>

              {/* Modal Close Button */}
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary">Close</button>
                </form>
              </div>
            </div>
          )}
        </dialog>
        <dialog ref={editDetailsModalRef} className="modal modal-middle">
          {particularLesson && (
            <div className="modal-box max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Edit Lesson</h2>

              <form
                onSubmit={handleSubmit(handleUpdateLesson)}
                className="space-y-4"
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
    </div>
  );
};

export default MyLessons;