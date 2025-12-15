import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/favorite/lessons-content?email=${user.email}`
      );
      console.log(res.data)
      return res.data;
    },
  });
  

  const handleRemove = async (id, lessonId) => {
    const confirm = await Swal.fire({
      title: "Remove from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Remove",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/favorites/remove/${id}/${lessonId}?email=${user.email}`);
      queryClient.invalidateQueries(["favorites", user.email]);
      Swal.fire("Removed!", "", "success");
    }
  };

  const filteredFavorites = favorites.filter((f) => {
    const categoryMatch = categoryFilter ? f.category === categoryFilter : true;

    const toneMatch = toneFilter ? f.emotionalTone === toneFilter : true;

    return categoryMatch && toneMatch;
  });

  if (isLoading)
    return <p className="text-center py-10">Loading favorites...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Favorite Lessons</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="select select-bordered"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Mindset">Mindset</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setToneFilter(e.target.value)}
        >
          <option value="">All Emotional Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Lesson</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFavorites.map((fav, index) => (
              <tr key={fav._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{fav.lessonTitle}</td>
                <td>{fav.category}</td>
                <td>{fav.emotionalTone}</td>
                <td>{fav.creatorName}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/lessons/${fav.lessonId}`}
                    className="btn btn-sm btn-info"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleRemove(fav._id, fav.lessonId)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {filteredFavorites.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  No favorites found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;
