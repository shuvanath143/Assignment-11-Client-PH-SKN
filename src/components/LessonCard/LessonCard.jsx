import { FaLock, FaRegClock, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const LessonCard = ({ lesson, isPremium, isInsideDashboard }) => {
  const {
    _id,
    title,
    shortDescription,
    category,
    emotionalTone,
    creatorName,
    creatorPhoto,
    accessLevel,
    createdAt,
    featuredImageUrl,
    views = 0,
    likesCount = 0,
  } = lesson;

  const path = isInsideDashboard
    ? `/dashboard/lessons/${_id}`
    : `/lessons/${_id}`;
  const premiumLocked = accessLevel === "premium" && !isPremium;
  console.log(accessLevel, isPremium, premiumLocked)
  

  return (
    <div className="relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-base-300/50 group backdrop-blur-sm hover:-translate-y-2 hover:scale-[1.02]">
      {/* Premium Blur Layer */}
      {premiumLocked && (
        <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-br from-base-100/90 to-base-200/90 flex flex-col items-center justify-center z-20 p-3 md:p-4 rounded-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-30 animate-pulse"></div>
            <FaLock className="relative text-3xl sm:text-4xl md:text-5xl text-primary mb-3 md:mb-4 drop-shadow-lg" />
          </div>
          <p className="font-bold text-base-content mb-1 md:mb-2 text-sm md:text-base">Premium Content</p>
          <p className="text-xs md:text-sm text-base-content/70 mb-4 md:mb-6 text-center leading-relaxed">Unlock exclusive insights</p>
          <Link
            to="/pricing"
            className="btn btn-primary btn-sm rounded-full px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FaStar className="mr-2" />
            Upgrade Now
          </Link>
        </div>
      )}

      {/* Thumbnail with Enhanced Effects */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={featuredImageUrl || "https://via.placeholder.com/400x250"}
          alt={title}
          className={`w-full h-44 sm:h-48 md:h-52 object-cover transition-all duration-700 group-hover:scale-110 ${
            premiumLocked ? "filter blur-sm" : ""
          }`}
        />
        
        {/* Multi-layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-content/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        {/* Floating badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-base-100/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-primary/20">
            {category}
          </span>
        </div>
        
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border ${
            accessLevel === "premium" 
              ? "bg-gradient-to-r from-accent/90 to-secondary/90 text-white border-accent/30" 
              : "bg-success/90 text-white border-success/30"
          }`}>
            {accessLevel === "premium" ? "PREMIUM" : "FREE"}
          </span>
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-3 left-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-1 bg-base-100/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            <FaEye className="text-primary" />
            <span className="text-base-content">{views}</span>
          </div>
          <div className="flex items-center gap-1 bg-base-100/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            <FaHeart className="text-error" />
            <span className="text-base-content">{likesCount}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-4 sm:p-5 md:p-6 space-y-4 flex flex-col flex-1">
        {/* Emotional tone badge */}
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-secondary/10 to-primary/10 text-secondary px-3 py-1.5 rounded-full border border-secondary/20">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            {emotionalTone}
          </span>
        </div>

        {/* Title with enhanced typography */}
        <h3 className="text-lg sm:text-xl font-bold text-base-content group-hover:text-primary transition-all duration-300 line-clamp-1 leading-tight tracking-tight">
          {title}
        </h3>

        {/* Description with better spacing */}
        <p className="text-sm text-base-content/70 line-clamp-1 leading-relaxed">
          {shortDescription}
        </p>

        {/* Enhanced Creator Info */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-base-200/50 to-base-300/30 rounded-xl border border-base-300/30">
          <div className="relative">
            <img
              src={creatorPhoto}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/30 shadow-md"
              alt={creatorName}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-base-content truncate">
              {creatorName}
            </p>
            <div className="flex items-center gap-2 text-xs text-base-content/60">
              <FaRegClock className="text-primary" />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <Link
          to={path}
          className="group/btn relative block text-center overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-100 group-hover/btn:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
          <div className="relative py-3 md:py-4 px-6 text-primary-content font-semibold text-sm md:text-base tracking-wide">
            <span className="flex items-center justify-center gap-2">
              See Details
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default LessonCard;
