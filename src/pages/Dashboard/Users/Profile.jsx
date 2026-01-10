import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import LessonCard from "../../../components/LessonCard/LessonCard";
import usePremium from "../../../hooks/usePremium";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useAuth();
  const { isPremium } = usePremium()
  // console.log(isPremium)
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
    <div className="px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content text-center md:text-left mb-4 sm:mb-6 md:mb-8">
        My Profile
      </h2>

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
        {/* Left Panel */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 bg-gradient-to-b from-base-200 to-base-100 p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl shadow-lg w-full lg:w-1/3 transition-transform hover:scale-105 duration-300 border border-base-300">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary/30 shadow-md"
            alt="Profile"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content">
              {user?.displayName}
            </h3>
            {isPremium && (
              <span className="bg-accent text-accent-content px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm">
                ⭐ Premium
              </span>
            )}
          </div>
          <p className="text-base-content/70 text-sm md:text-base text-center">{user?.email}</p>

          {/* Stats */}
          <div className="mt-3 md:mt-4 bg-primary/10 w-full rounded-lg md:rounded-xl p-3 md:p-4 text-center space-y-2 md:space-y-3 shadow-inner border border-primary/20">
            <div className="flex justify-between px-2 md:px-4">
              <span className="text-base-content font-medium text-sm md:text-base">
                Lessons Created:
              </span>
              <span className="font-bold text-base-content text-sm md:text-base">
                {userLessons.length}
              </span>
            </div>
            <div className="flex justify-between px-2 md:px-4">
              <span className="text-base-content font-medium text-sm md:text-base">Lessons Saved:</span>
              <span className="font-bold text-base-content text-sm md:text-base">
                {favorites.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-base-100 p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl shadow-lg w-full lg:w-2/3 transition-shadow hover:shadow-2xl border border-base-300">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-base-content mb-4 md:mb-6">
            Update Profile
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary/40 focus:border-primary rounded-lg text-sm md:text-base bg-base-100 border-base-300"
              defaultValue={user.displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />
            <input
              type="text"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary/40 focus:border-primary rounded-lg text-sm md:text-base bg-base-100 border-base-300"
              value={user.photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Photo URL"
            />
            <button
              onClick={handleUpdateProfile}
              className="btn btn-primary w-full text-primary-content font-semibold rounded-lg shadow-md text-sm md:text-base"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* User Lessons Grid */}
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-3 sm:mb-4 md:mb-6">My Public Lessons</h3>
        {userLessons.length === 0 ? (
          <div className="text-center py-8 bg-base-100 rounded-lg shadow border border-base-300">
            <p className="text-base-content/70 mb-4">You have not created any lessons yet.</p>
            <Link 
              to="/dashboard/add-lesson"
              className="btn btn-primary btn-sm"
            >
              Create Your First Lesson
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {userLessons
              .filter((l) => l.visibility === "public")
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  isPremium={isPremium}
                  // isPremiumUser={user?.subscription === "premium"}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
