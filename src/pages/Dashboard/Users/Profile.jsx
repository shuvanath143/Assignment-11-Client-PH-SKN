import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import LessonCard from "../../../components/LessonCard/LessonCard";
import usePremium from "../../../hooks/usePremium";

const Profile = () => {
  const { user } = useAuth();
  const { isPremium } = usePremium()
  console.log(isPremium)
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [displayName, setDisplayName] = useState(user?.name || "");
  const [photoURL, setPhotoURL] = useState(user?.photo || "");

  // Get number of lessons created by user
  const { data: userLessons = [] } = useQuery({
    queryKey: ["userLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?creatorEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Get number of favorites saved
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdateProfile = async () => {
    if (!displayName) {
      return Swal.fire("Error", "Name cannot be empty", "error");
    }

    try {
      await axiosSecure.patch(`/users/update-profile/${user.uid}`, {
        name: displayName,
        photo: photoURL,
      });

      queryClient.invalidateQueries(["userProfile", user?.email]);

      Swal.fire("Updated!", "Profile updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Page Title */}
      <h2 className="text-4xl font-extrabold text-gray-800 text-center md:text-left mb-6">
        My Profile
      </h2>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Panel */}
        <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl shadow-lg w-full md:w-1/3 transition-transform hover:scale-105 duration-300">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300 shadow-md"
            alt="Profile"
          />
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {user?.displayName}
            </h3>
            {isPremium && (
              <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                ⭐ Premium
              </span>
            )}
          </div>
          <p className="text-gray-500">{user?.email}</p>

          {/* Stats */}
          <div className="mt-4 bg-indigo-50 w-full rounded-xl p-4 text-center space-y-2 shadow-inner">
            <div className="flex justify-between px-4">
              <span className="text-gray-700 font-medium">
                Lessons Created:
              </span>
              <span className="font-bold text-gray-900">
                {userLessons.length}
              </span>
            </div>
            <div className="flex justify-between px-4">
              <span className="text-gray-700 font-medium">Lessons Saved:</span>
              <span className="font-bold text-gray-900">
                {favorites.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-2/3 transition-shadow hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Update Profile
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-lg"
              defaultValue={user.displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
            <input
              type="text"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-lg"
              value={user.photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Photo URL"
            />
            <button
              onClick={handleUpdateProfile}
              className="btn btn-primary w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* User Lessons Grid */}
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-800">My Public Lessons</h3>
        {userLessons.length === 0 ? (
          <p className="text-gray-500">You have not created any lessons yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userLessons
              .filter((l) => l.visibility === "public")
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  isPremiumUser={user?.subscription === "premium"}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
