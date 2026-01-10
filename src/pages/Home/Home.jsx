import { useEffect, useState, useRef } from "react";
import LessonCard from "../../components/LessonCard/LessonCard";
import SearchFilterBar from "../../components/SearchFilterBar/SearchFilterBar";
import TestimonialCard from "../../components/Card/TestimonialCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePremium from "../../hooks/usePremium";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useLenisGsap from "../../hooks/useLenisGsap";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HomeSlider.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const axiosSecure = useAxiosSecure();
  useLenisGsap(); // ✅ smooth scrolling globally

  // ---------- Refs ----------
  const heroRef = useRef(null);
  const sliderRef = useRef(null);
  const lessonRef = useRef(null);
  const recommendedRef = useRef(null);
  const testimonialRef = useRef(null);

  // ---------- Slider Images ----------
  const sliderImages = [
    {
      src: "/pexels-brettjordan-8695313.jpg",
      title: "Discover Your Inner Strength",
      subtitle: "Transform challenges into opportunities for growth"
    },
    {
      src: "/pexels-eva-bronzini-6956353.jpg",
      title: "Embrace Life's Journey",
      subtitle: "Every experience teaches us something valuable"
    },
    {
      src: "/pexels-moe-magners-6669761.jpg",
      title: "Find Your Purpose",
      subtitle: "Unlock the wisdom within your daily experiences"
    },
    {
      src: "/pexels-monstera-11444616.jpg",
      title: "Connect & Learn",
      subtitle: "Share stories that inspire and transform lives"
    },
    {
      src: "/pexels-dna-art-club-2013280938-29373715.jpg",
      title: "Grow Together",
      subtitle: "Join a community of lifelong learners and storytellers"
    },
    {
      src: "/aerial-view-businessman-writing-notepad.jpg",
      title: "Plan Your Success",
      subtitle: "Strategic thinking and careful planning lead to meaningful achievements"
    },
    {
      src: "/creation-ideas-light-bule-imagination-arts-development-concept.jpg",
      title: "Ignite Your Creativity",
      subtitle: "Innovation and imagination are the keys to breakthrough moments"
    },
    {
      src: "/pexels-rdne-8363153.jpg",
      title: "Build Meaningful Connections",
      subtitle: "Authentic relationships and collaboration create lasting impact"
    }
  ];

  // ---------- Animations ----------
  useEffect(() => {
    // Hero animation (on page load)
    const tlHero = gsap.timeline({ delay: 0.5 });
    tlHero.fromTo(
      heroRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Slider animation (triggered on scroll)
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Lesson grid animation (triggered on scroll)
    if (lessonRef.current) {
      gsap.fromTo(
        lessonRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lessonRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Recommended section animation (triggered on scroll)
    if (recommendedRef.current) {
      gsap.fromTo(
        recommendedRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: recommendedRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Testimonial section animation (triggered on scroll)
    if (testimonialRef.current) {
      gsap.fromTo(
        testimonialRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [lessonRef, recommendedRef, sliderRef, testimonialRef]);

  // ---------- State ----------
  const [lessons, setLessons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    tone: "",
    dateRange: "",
    sortBy: "newest",
  });

  const { isPremium } = usePremium();

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];

  const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

  // ---------- Fetch lessons ----------
  useEffect(() => {
    axiosSecure.get("/lessons").then((res) => {
      setLessons(res.data);
      setFiltered(res.data);
    });
  }, [axiosSecure]);

  // ---------- Filter logic ----------
  useEffect(() => {
    let data = lessons;

    if (search) {
      data = data.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(search.toLowerCase()) ||
          lesson.category.toLowerCase().includes(search.toLowerCase()) ||
          lesson.emotionalTone.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.category) {
      data = data.filter((lesson) => lesson.category === filters.category);
    }

    if (filters.tone) {
      data = data.filter((lesson) => lesson.emotionalTone === filters.tone);
    }

    switch (filters.sortBy) {
      case "oldest":
        data = data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "alphabetical":
        data = data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
        data = data.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "newest":
      default:
        data = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
    }

    setFiltered(data);
  }, [search, filters, lessons]);

  const handleSearchChange = (searchTerm) => setSearch(searchTerm);
  const handleFiltersChange = (newFilters) => setFilters(newFilters);

  // Scroll to lessons section
  const scrollToLessons = () => {
    const lessonsSection = document.getElementById('lessons-section');
    if (lessonsSection) {
      lessonsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        {/* Hero Section */}
        <header
          ref={heroRef}
          className="text-center py-6 sm:py-8 md:py-12 lg:py-16"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Explore Powerful Life Lessons
            </h1>
            <p className="text-base-content/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
              Real stories. Real experiences. Grow every day with curated
              wisdom from life's journey.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
              <button className="btn btn-primary btn-lg">Start Learning</button>
              <button className="btn btn-outline btn-lg">Browse Lessons</button>
            </div>
          </div>
        </header>

        {/* Image Slider Section */}
        <section ref={sliderRef} className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Featured Stories
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-3 sm:mb-4">
                Inspiring Life Moments
              </h2>
              <p className="text-sm sm:text-base text-base-content/70 max-w-2xl mx-auto px-4 sm:px-0">
                Discover powerful stories and transformative experiences that shape our understanding of life
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                effect="fade"
                fadeEffect={{
                  crossFade: true
                }}
                loop={true}
                className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
              >
                {sliderImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-base-content/80 via-base-content/40 to-transparent"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex items-end justify-center p-6 sm:p-8 md:p-12">
                        <div className="text-center text-white max-w-4xl slide-content">
                          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                            {image.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 leading-relaxed mb-4 sm:mb-6">
                            {image.subtitle}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button 
                              onClick={scrollToLessons}
                              className="btn btn-primary btn-sm sm:btn-md bg-primary/90 hover:bg-primary border-none backdrop-blur-sm hover:scale-[1.05]"
                            >
                              Explore Stories
                            </button>
                            <button 
                              onClick={scrollToLessons}
                              className="btn btn-secondary btn-sm sm:btn-md text-white border-white/50 hover:bg-secondary/80 hover:text-base-content backdrop-blur-sm hover:scale-[1.05]"
                            >
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-base-100/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-base-100/30 transition-all duration-300 group">
                <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-base-100/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-base-100/30 transition-all duration-300 group">
                <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <SearchFilterBar
          onSearchChange={handleSearchChange}
          onFiltersChange={handleFiltersChange}
          categories={categories}
          tones={tones}
          className="mb-6 sm:mb-8 md:mb-12"
        />

        {/* Results Summary */}
        <div id="lessons-section" className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 bg-base-100 p-4 md:p-6 rounded-xl shadow-sm border border-base-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content">
              {search || filters.category || filters.tone ? 'Search Results' : 'Latest Lessons'}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-xs sm:text-sm text-base-content/70">
                {filtered.filter((l) => l.isReviewed === "reviewed").length} lessons found
              </span>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {filtered.filter((l) => l.isReviewed === "reviewed").length === 0 ? (
          <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="max-w-xs sm:max-w-md mx-auto px-4 bg-base-100 p-6 sm:p-8 rounded-2xl shadow-lg border border-base-300">
              <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2">
                No lessons found
              </h3>
              <p className="text-sm sm:text-base text-base-content/70">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          </div>
        ) : (
          <div
            ref={lessonRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {filtered
              .filter((l) => l.isReviewed === "reviewed")
              .map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  isPremium={isPremium}
                />
              ))}
          </div>
        )}

        {/* Recommended Section */}
        {(!search && !filters.category && !filters.tone) && (
          <section
            ref={recommendedRef}
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          >
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-content mb-3 sm:mb-4 md:mb-6">
                Recommended For You
              </h2>
              <p className="text-sm sm:text-base text-base-content/70 max-w-md mx-auto px-4 sm:px-0">
                Handpicked lessons that inspire and transform, curated by our
                community
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {lessons
                .filter((l) => l.isFeatured === "yes")
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
        )}

        {/* Testimonials Section */}
        <div ref={testimonialRef}>
          <TestimonialCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
