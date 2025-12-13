import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const LessonsManagement = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["admin-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lessons");
      return res.data;
    }
  });

  // Toggle Visibility
  const handleToggleVisibility = async (id, visibility) => {
    const newVisibility = visibility === 'public' ? 'private' : 'public'
    const res = await axiosSecure.patch(`/admin/lessons/${id}/${newVisibility}`);
    // console.log(res)
    queryClient.invalidateQueries(["admin-lessons"]);
  };

  // Toggle Access Level (free/premium)
  const handleToggleAccess = async (id, access) => {
    
    const newAccessLevel = access === "free" ? "premium" : "free";
    const updatedDoc = {
      accessLevel: newAccessLevel,
    };
    const res = await axiosSecure.patch(
      `/lessons/${id}/access`,
      updatedDoc
    );
    console.log(res)
    queryClient.invalidateQueries(["admin-lessons"]);
  };

  // Review Lesson and Grant Access
  const handleReviewLesson = async (id, isReviewed) => {
    const reviewStatus = isReviewed === "pending" ? "reviewed" : "pending";
    const updatedDoc = {
      isReviewed: reviewStatus,
    };
    const res = await axiosSecure.patch(`/reviewed/lessons/${id}`, updatedDoc);
    console.log(res)
    queryClient.invalidateQueries(["admin-lessons"]);
  }

  // Delete lesson
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Lesson?",
      text: "This will permanently remove the lesson",
      icon: "warning",
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/admin/lessons/${id}`);
        console.log(res.data)
        if (res.data.deletedCount)
          Swal.fire("Deleted!", "Lesson removed successfully", "success");
        // refresh lessons
        queryClient.invalidateQueries(["admin-lessons"]);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Lessons</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson</th>
              <th>Creator</th>
              <th>Visibility</th>
              <th>Public Access</th>
              <th>Reviewed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <td>{index + 1}</td>

                <td>
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-xs text-gray-500">{lesson.category}</p>
                </td>

                <td className="flex items-center gap-2">
                  <img
                    src={lesson.creator?.photo}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{lesson.creator?.name}</span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleToggleVisibility(lesson._id, lesson.visibility)
                    }
                    className={`btn btn-sm btn-outline ${
                      lesson.visibility === "public"
                        ? "btn-success"
                        : "btn-warning"
                    }`}
                  >
                    {lesson.visibility}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleToggleAccess(lesson._id, lesson.accessLevel)}
                    className={`btn btn-sm btn-outline ${
                      lesson.accessLevel === "free"
                        ? "btn-info"
                        : "btn-secondary"
                    }`}
                  >
                    {lesson.accessLevel}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleReviewLesson(lesson._id, lesson.isReviewed)}
                    className={`btn btn-sm btn-outline ${
                      lesson.isReviewed === "pending"
                        ? "btn-info"
                        : "btn-secondary"
                    }`}
                  >
                    {lesson.isReviewed}
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonsManagement;
