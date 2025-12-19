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

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
    <div className="p-6">
      {/* ================== HEADER ================== */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome back, {user?.name} 👋
      </h1>

      {/* ================== STATS ================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Lessons Created" value={myLessons.length} />
        <StatCard title="Saved Lessons" value={favorites.length} />
        <StatCard title="Recent Lessons" value={myLessons.slice(0, 3).length} />
      </div>

      {/* ================== QUICK ACTIONS ================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
      <div className="bg-white p-6 rounded-xl shadow-md mb-12">
        <h2 className="text-xl font-bold mb-6">
          Weekly Contributions
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
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
                isPremiumUser={user?.subscription === "premium"}
              />
            ))}
        </div>
      )}
    </div>
  );
};

/* ================== SMALL COMPONENTS ================== */

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex flex-col items-center justify-center gap-3 bg-gray-100 hover:bg-blue-600 hover:text-white transition p-6 rounded-xl shadow-md"
  >
    <span className="text-2xl">{icon}</span>
    <span className="font-semibold">{label}</span>
  </Link>
);

export default UserDashboard;
