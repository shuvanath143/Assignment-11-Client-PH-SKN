import { useEffect, useState } from "react";
import { FaUsers, FaBook, FaFlag, FaChartLine } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    totalReported: 0,
    topContributors: [],
    todaysLessons: 0,
    lessonGrowth: [],
    userGrowth: [],
  });

  useEffect(() => {
    // Fetch stats from backend endpoints
    const fetchStats = async () => {
      const users = await fetch("http://localhost:5000/users").then((res) =>
        res.json()
      );
      const lessons = await fetch("http://localhost:5000/lessons").then((res) =>
        res.json()
      );
      const reports = await fetch(
        "http://localhost:5000/reported-lessons"
      ).then((res) => res.json());

      // Most active contributors
      const contributorCount = {};
      lessons.forEach((lesson) => {
        const email = lesson.creatorEmail;
        if (contributorCount[email]) contributorCount[email]++;
        else contributorCount[email] = 1;
      });
      const topContributors = Object.entries(contributorCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([email, count]) => ({ email, count }));

      // Today's new lessons
      const today = new Date();
      const todaysLessons = lessons.filter((lesson) => {
        const created = new Date(lesson.createdAt);
        return created.toDateString() === today.toDateString();
      }).length;

      // Lesson Growth: last 7 days
      const lessonGrowth = [];
      for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const dayCount = lessons.filter(
          (l) => new Date(l.createdAt).toDateString() === day.toDateString()
        ).length;
        lessonGrowth.push({ date: day.toLocaleDateString(), count: dayCount });
      }

      // User Growth: last 7 days
      const userGrowth = [];
      for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const dayCount = users.filter(
          (u) => new Date(u.createdAt).toDateString() === day.toDateString()
        ).length;
        userGrowth.push({ date: day.toLocaleDateString(), count: dayCount });
      }

      setStats({
        totalUsers: users.length,
        totalLessons: lessons.filter((l) => l.visibility === "public").length,
        totalReported: reports.length,
        topContributors,
        todaysLessons,
        lessonGrowth,
        userGrowth,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-5 rounded-xl flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-600" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white shadow p-5 rounded-xl flex items-center gap-4">
          <FaBook className="text-3xl text-green-600" />
          <div>
            <p className="text-gray-500">Total Public Lessons</p>
            <p className="text-xl font-bold">{stats.totalLessons}</p>
          </div>
        </div>

        <div className="bg-white shadow p-5 rounded-xl flex items-center gap-4">
          <FaFlag className="text-3xl text-red-600" />
          <div>
            <p className="text-gray-500">Reported Lessons</p>
            <p className="text-xl font-bold">{stats.totalReported}</p>
          </div>
        </div>
      </div>

      {/* Top Contributors & Today */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="font-bold text-lg mb-4">Most Active Contributors</h2>
          <ul>
            {stats.topContributors.map((c, idx) => (
              <li key={idx} className="flex justify-between py-1 border-b">
                <span>{c.email}</span>
                <span className="font-semibold">{c.count} Lessons</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow p-5 rounded-xl flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg mb-2">Today's New Lessons</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.todaysLessons}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="font-bold text-lg mb-4">
            Lesson Growth (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.lessonGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="font-bold text-lg mb-4">User Growth (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
