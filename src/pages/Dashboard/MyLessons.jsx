import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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
    if (!user.isPremium) {
      Swal.fire("Only premium users can change access level!");
      return;
    }
    const newAccess = currentAccess === "free" ? "premium" : "free";
    await axiosSecure.patch(`/lessons/${lessonId}/access`, {
      accessLevel: newAccess,
    });
    queryClient.invalidateQueries(["my-lessons", user?.email]);
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
            <tr className="bg-gray-100">
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Reactions</th>
              <th>Saves</th>
              <th>Created</th>
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
                    className={`btn btn-sm ${
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
                    className={`btn btn-sm ${
                      lesson.accessLevel === "free" ? "btn-info" : "btn-primary"
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
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() =>
                      window.location.assign(`/dashboard/lessons/${lesson._id}`)
                    }
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() =>
                      window.location.assign(
                        `/dashboard/update-lesson/${lesson._id}`
                      )
                    }
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
      </div>
    </div>
  );
};

export default MyLessons;