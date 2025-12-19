import { FaLock, FaRegClock } from "react-icons/fa";
import { Link } from "react-router";

const LessonCard = ({ lesson, isPremium, isInsideDashboard }) => {
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

  const path = isInsideDashboard
    ? `/dashboard/lessons/${_id}`
    : `/lessons/${_id}`;
  const premiumLocked = accessLevel === "premium" && !isPremium;

  return (
    <div className="relative bg-base-100 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-base-200">
      {/* Premium Blur Layer */}
      {premiumLocked && (
        <div className="absolute inset-0 backdrop-blur-md bg-base-100/60 flex flex-col items-center justify-center z-20">
          <FaLock className="text-4xl text-base-content mb-2" />
          <p className="font-semibold text-base-content">Premium Lesson</p>
          <p className="text-sm text-base-content/70 mb-3">Upgrade to view</p>
          <Link
            to="/pricing"
            className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus"
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
          <span className="text-xs font-semibold bg-base-200 text-base-content px-2 py-1 rounded">
            {category}
          </span>
          <span className="text-xs font-semibold text-secondary">
            {emotionalTone}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-1 text-primary">{title}</h3>

        <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
          {shortDescription}
        </p>

        {/* Creator Info */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={creator?.photo}
            className="w-8 h-8 rounded-full object-cover"
            alt={creator?.name}
          />
          <p className="text-sm font-medium text-base-content">
            {creator?.name}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-base-content/60">
          <span className="flex items-center gap-1">
            <FaRegClock /> {new Date(createdAt).toLocaleDateString()}
          </span>

          <span
            className={`text-xs font-semibold ${
              accessLevel === "premium" ? "text-yellow-400" : "text-green-400"
            }`}
          >
            {accessLevel.toUpperCase()}
          </span>
        </div>

        {/* Button */}
        <Link
          to={path}
          className="block mt-4 text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-focus"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
