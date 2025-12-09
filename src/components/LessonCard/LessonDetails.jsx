import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  FaLock,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaShare,
  FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../../components/LessonCard/LessonCard";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const LessonDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  //   const [lesson, setLesson] = useState(null);
//   const [similarLessons, setSimilarLessons] = useState([]);

  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const isPremiumUser = user?.isPremium;

  const { data: lesson = [], isLoading: isLessonLoading, error: lessonError, refetch } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/lessons/${id}`);
      console.log(res.data)
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (lesson) {
      setLiked(lesson.likes?.includes(user?.email));
      setFavorite(lesson.favorites?.includes(user?.email));
    }
  }, [lesson, user?.email]);

  const { data: similarLessons = [], isLoading: isSimilarLessonsLoading } =
    useQuery({
      enabled: !!lesson?.category,
      queryKey: ["similarLessons", lesson?.category, axiosInstance],
      queryFn: async () => {
        const res = await axiosInstance(`/lessons?category=${lesson.category}`);
        return res.data.slice(0, 6);
      },
    });

  // --- Loading and Error States ---
  if (isLessonLoading || !lesson) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (lessonError) {
    // Handle error state, e.g., show a dedicated error message or component
    return (
      <p className="text-center py-20 text-red-600">
        Error loading lesson: {lessonError.message}
      </p>
    );
  }


  const premiumLocked = lesson.accessLevel === "premium" && !isPremiumUser;

  const handleLike = async () => {
    if (!user)
      return Swal.fire("Login Required", "Please log in to like", "info");

    setLiked(!liked);
    await axiosSecure.patch(`/lessons/like/${lesson._id}?email=${user.email}`);
    refetch()
  };

  const handleFavorite = async () => {
    if (!user)
      return Swal.fire("Login Required", "Please log in to save", "info");

    setFavorite(!favorite);
    console.log(favorite)
    await axiosSecure.patch(`/lessons/favorite/${lesson._id}?email=${user.email}`);
    refetch()
  };

  const handleReport = () => {
    Swal.fire({
      title: "Report Lesson?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Report",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.post("/lesson-reports", {
          lessonId: lesson._id,
          reporterUserId: user?.email,
          reason: "Inappropriate Content",
          timestamp: new Date(),
        });

        Swal.fire("Reported!", "The lesson has been reported.", "success");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={lesson.featuredImageUrl}
          alt={lesson.title}
          className={`w-full rounded-xl shadow-lg ${
            premiumLocked ? "blur-md opacity-60" : ""
          }`}
        />

        {premiumLocked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-white rounded-xl">
            <FaLock className="text-5xl mb-3" />
            <p className="text-lg font-semibold">Premium Content</p>
            <p className="mb-4 text-sm">Upgrade to unlock full access.</p>

            <Link
              to="/pricing"
              className="bg-yellow-500 px-6 py-2 rounded-lg font-bold text-black"
            >
              Upgrade Now
            </Link>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className={`${premiumLocked ? "blur-sm select-none" : "mt-10"}`}>
        <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>

        {/* Category */}
        <div className="flex gap-4 mb-6">
          <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold">
            {lesson.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          {lesson.fullDescription}
        </p>

        {/* Author Card */}
        <div className="p-5 border rounded-xl shadow-sm flex items-center gap-4 bg-gray-50 mb-10">
          <img
            src={lesson.creatorPhoto}
            className="w-16 h-16 rounded-full object-cover"
            alt="Author"
          />
          <div>
            <h3 className="text-xl font-bold">{lesson.creatorName}</h3>
            <p className="text-gray-600">
              Total Lessons: {lesson.creatorLessonsCount}
            </p>
          </div>
        </div>

        {/* Likes & Saves */}
        <div className="flex items-center gap-6 text-lg mb-10">
          <p className="flex items-center gap-2">
            ❤ {lesson.likes?.length || 0} Likes
          </p>
          <p className="flex items-center gap-2">
            🔖 {lesson.favorites?.length || 0} Favorites
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-16">
          <button
            onClick={handleFavorite}
            className="px-5 py-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300"
          >
            {favorite ? <FaBookmark /> : <FaRegBookmark />} Save
          </button>

          <button
            onClick={handleLike}
            className="px-5 py-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300"
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} Like
          </button>

          <button
            onClick={handleReport}
            className="px-5 py-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300"
          >
            <FaFlag /> Report
          </button>
        </div>

        {/* Similar Lessons */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Lessons</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarLessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                isPremiumUser={isPremiumUser}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
