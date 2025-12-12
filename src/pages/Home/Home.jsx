import { useEffect, useState } from "react";
import LessonCard from "../../components/LessonCard/LessonCard";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePremium from "../../hooks/usePremium";

const Home = ({ user }) => {
  const axiosSecure = useAxiosSecure();

  const [lessons, setLessons] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  const { isPremium } = usePremium()

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];

  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

  // Fetch lessons
  useEffect(() => {
    axiosSecure.get("/lessons").then((res) => {
      setLessons(res.data);
      setFiltered(res.data);
    });
  }, [axiosSecure]);

  // Filter logic
  useEffect(() => {
    let data = lessons;

    if (search) {
      data = data.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      data = data.filter((i) => i.category === categoryFilter);
    }

    if (toneFilter) {
      data = data.filter((i) => i.emotionalTone === toneFilter);
    }

    setFiltered(data);
  }, [search, categoryFilter, toneFilter, lessons, axiosSecure]);

  // const isPremiumUser = user?.subscription === "premium";

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-16">
      {/* ------------ Hero Section ------------ */}
      <header className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Explore Powerful Life Lessons
        </h1>
        <p className="text-gray-600 text-lg">
          Real stories. Real experiences. Grow every day.
        </p>
      </header>

      {/* ------------ Search Bar ------------ */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search lessons..."
          className="w-full py-3 px-4 pl-10 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* ------------ Filters ------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Category filter */}
        <div>
          <label className="font-semibold block mb-2">Category</label>
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full py-3 px-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Emotional Tone filter */}
        <div>
          <label className="font-semibold block mb-2">Emotional Tone</label>
          <select
            onChange={(e) => setToneFilter(e.target.value)}
            className="w-full py-3 px-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tones</option>
            {tones.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ------------ Lessons Grid ------------ */}
      <h2 className="text-2xl font-bold mb-4">Latest Lessons</h2>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              isPremium={isPremium}
            />
          ))}
        </div>
      )}

      {/* ------------ Recommended Section ------------ */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lessons
            .filter((l) => l.accessLevel === "free")
            .slice(0, 3)
            .map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                isPremium={isPremium}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
