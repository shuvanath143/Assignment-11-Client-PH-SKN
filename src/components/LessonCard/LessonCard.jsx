
import { FaLock, FaRegClock } from "react-icons/fa";
import { Link } from "react-router";

const LessonCard = ({ lesson, isPremiumUser }) => {
  const {
    _id,
    title,
    shortDescription,
    category,
    emotionalTone,
    creator,
    accessLevel,
    createdAt,
    featuredImageUrl,
  } = lesson;

  const premiumLocked = accessLevel === "premium" && !isPremiumUser;

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Premium Blur Layer */}
      {premiumLocked && (
        <div className="absolute inset-0 backdrop-blur-md bg-white/50 flex flex-col items-center justify-center z-20">
          <FaLock className="text-4xl text-gray-700 mb-2" />
          <p className="font-semibold text-gray-700">Premium Lesson</p>
          <p className="text-sm text-gray-600 mb-3">Upgrade to view</p>
          <Link
            to="/pricing"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Upgrade Now
          </Link>
        </div>
      )}

      {/* Thumbnail */}
      <img
        src={featuredImageUrl || "https://via.placeholder.com/400x250"}
        alt={title}
        className={`w-full h-48 object-cover ${
          premiumLocked ? "filter blur-sm" : ""
        }`}
      />

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold bg-gray-200 px-2 py-1 rounded">
            {category}
          </span>
          <span className="text-xs font-semibold text-blue-600">
            {emotionalTone}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-1">{title}</h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {shortDescription}
        </p>

        {/* Creator Info */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={creator?.photo}
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="text-sm font-medium">{creator?.name}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaRegClock /> {new Date(createdAt).toLocaleDateString()}
          </span>

          <span
            className={`text-xs font-semibold ${
              accessLevel === "premium" ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {accessLevel.toUpperCase()}
          </span>
        </div>

        {/* Button */}
        <Link
          to={`/dashboard/lessons/${_id}`}
          className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
