import { useParams, Link, useNavigate } from "react-router";
import {
  FaLock,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../../components/LessonCard/LessonCard";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import usePremium from "../../hooks/usePremium";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const LessonDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { isPremium } = usePremium();
  
  const navigate = useNavigate();

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient()

  // Fetch lesson
  const {
    data: lesson,
    isLoading: isLessonLoading,
    error: lessonError,
    refetch: lessonRefetch,
  } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/lessons/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch favorite lessons (only if user logged in)
  const { data: favoriteLessons = [], refetch: favoriteRefetch } = useQuery({
    queryKey: ["favoriteLessons", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/lessons/favorite?email=${user?.email}`
      );
      return data; // returns only array: ["id1", "id2"]
    },
    enabled: !!user?.email,
  });

  const liked = user ? lesson?.likes?.includes(user.email) : false;
  console.log("favoriteLessons", favoriteLessons)
  console.log(id.toString())
  const favorite = user
    ? favoriteLessons?.includes(id?.toString())
    : false;
    console.log("Favoritelessons & Favorite:" ,favoriteLessons, favorite)

  // Similar lessons
  const { data: similarLessons = [] } = useQuery({
    queryKey: ["similarLessons", lesson?.category, id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons?category=${lesson.category}&id=${id}`
      );
      console.log('similar', res.data)
      return res.data.slice(0, 6);
    },
    enabled: !!lesson?.category && !!id,
  });

  if (isLessonLoading) return <p className="text-center py-20">Loading...</p>;
  if (lessonError)
    return (
      <p className="text-center py-20 text-red-600">Error loading lesson.</p>
    );
  if (!lesson) return <p className="text-center py-20">Lesson not found.</p>;
    console.log("similar", similarLessons);
  const premiumLocked = lesson.accessLevel === "premium" && !isPremium;

  const handleLike = async () => {
    if (!user) return navigate("/login");
    await axiosSecure.patch(`/lessons/like/${lesson._id}?email=${user.email}`);
    lessonRefetch();
  };

  const handleFavorite = async (lessonId) => {
    console.log(lessonId)
    if (!user) return navigate("/login");
    await axiosSecure.patch(
      `/lessons/favorite/${lessonId}?email=${user.email}`
    );
    queryClient.invalidateQueries(["favoriteLessons"]);
    queryClient.invalidateQueries(["lesson"]);
    favoriteRefetch();
  };

  const handleReport = () => {
    if (!user) return navigate("/login");

    Swal.fire({
      title: "Report Lesson",
      text: "Select a reason for reporting this lesson",
      icon: "warning",
      input: "select",
      inputOptions: {
        "Inappropriate Content": "Inappropriate Content",
        "Hate Speech or Harassment": "Hate Speech or Harassment",
        "Misleading or False Information": "Misleading or False Information",
        "Spam or Promotional Content": "Spam or Promotional Content",
        "Sensitive or Disturbing Content": "Sensitive or Disturbing Content",
        Other: "Other",
      },
      inputPlaceholder: "Choose a reason",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Report",
      inputValidator: (value) => {
        if (!value) return "Please select a reason!";
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const selectedReason = result.value;

        await axiosSecure.post("/lesson-reports", {
          lessonId: lesson._id,
          author: lesson.creatorName,
          reporterUserId: user?.email,
          reason: selectedReason,
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
          className={`w-full object-contain h-[250px] md:h-[500px] rounded-xl shadow-lg ${
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
        <div className="flex gap-4 mb-6">
          <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold">
            {lesson.category}
          </span>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          {lesson.fullDescription}
        </p>

        {/* Author */}
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
            🔖 {lesson.favoritesCount || 0} Favorites
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-16">
          <button
            onClick={() => handleFavorite(lesson._id)}
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
                isPremium={isPremium}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
