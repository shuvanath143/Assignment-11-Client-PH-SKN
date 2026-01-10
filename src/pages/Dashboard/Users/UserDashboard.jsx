import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LessonCard from "../../../components/LessonCard/LessonCard";
import {
  FaPlus,
  FaBook,
  FaBookmark,
  FaUser,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import usePremium from "../../../hooks/usePremium";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPremium } = usePremium()

  /* ------------------ QUERIES ------------------ */

  const { data: myLessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons?creatorEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/favorites?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  /* ------------------ WEEKLY ANALYTICS ------------------ */
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - i);

    return {
      day: day.toLocaleDateString("en-US", { weekday: "short" }),
      count: myLessons.filter(
        (l) =>
          new Date(l.createdAt).toDateString() ===
          day.toDateString()
      ).length,
    };
  }).reverse();

  return (
    <div className="px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      {/* ================== HEADER ================== */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-base-content">
        Welcome back, {user?.name} 👋
      </h1>

      {/* ================== STATS ================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
        <StatCard title="Lessons Created" value={myLessons.length} />
        <StatCard title="Saved Lessons" value={favorites.length} />
        <StatCard title="Recent Lessons" value={myLessons.slice(0, 3).length} />
      </div>

      {/* ================== QUICK ACTIONS ================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
        <QuickLink
          to="/dashboard/add-lesson"
          icon={<FaPlus />}
          label="Add Lesson"
        />
        <QuickLink
          to="/dashboard/my-lessons"
          icon={<FaBook />}
          label="My Lessons"
        />
        <QuickLink
          to="/dashboard/my-favorites"
          icon={<FaBookmark />}
          label="Favorites"
        />
        <QuickLink
          to="/dashboard/profile"
          icon={<FaUser />}
          label="Profile"
        />
      </div>

      {/* ================== ANALYTICS ================== */}
      <div className="bg-base-100 p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl shadow-md mb-6 sm:mb-8 md:mb-12 border border-base-300">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 md:mb-6 text-base-content">
          Weekly Contributions
        </h2>

        <div className="w-full h-48 sm:h-56 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="hsl(var(--color-primary))"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================== RECENT LESSONS ================== */}
      <h2 className="text-2xl font-bold mb-6">
        Recently Added Lessons
      </h2>

      {lessonsLoading ? (
        <p className="text-gray-500">Loading lessons...</p>
      ) : myLessons.length === 0 ? (
        <p className="text-gray-500">
          You haven’t added any lessons yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myLessons
            .sort(
              (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            )
            .slice(0, 6)
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
  );
};

/* ================== SMALL COMPONENTS ================== */

const StatCard = ({ title, value }) => (
  <div className="bg-base-100 p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl shadow-md border border-base-300">
    <p className="text-base-content/70 text-xs sm:text-sm mb-1 md:mb-2">{title}</p>
    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content">{value}</p>
  </div>
);

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex flex-col items-center justify-center gap-2 md:gap-3 bg-base-200 hover:bg-primary hover:text-primary-content transition-all duration-300 p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl shadow-md min-h-[80px] sm:min-h-[100px] md:min-h-[120px]"
  >
    <span className="text-lg sm:text-xl md:text-2xl">{icon}</span>
    <span className="font-semibold text-xs sm:text-sm md:text-base text-center leading-tight">{label}</span>
  </Link>
);

export default UserDashboard;
