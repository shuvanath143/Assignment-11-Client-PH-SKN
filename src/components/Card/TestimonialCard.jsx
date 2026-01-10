import { FaQuoteLeft, FaQuoteRight, FaStar, FaThumbsUp } from 'react-icons/fa';

const TestimonialCard = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "This platform has completely transformed how I approach life's challenges. The lessons here are genuine and deeply impactful.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      text: "I've learned more about myself in 3 months here than in years of self-help books. The community is incredibly supportive.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      text: "The life lessons shared here are authentic and relatable. It's like having a mentor guiding you through life's journey.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Thompson",
      text: "Premium content is worth every penny. The depth and quality of insights have helped me make better life decisions.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lisa Park",
      text: "As someone who struggled with personal growth, this platform provided the guidance and community I needed to thrive.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "James Wilson",
      text: "The storytelling approach makes complex life lessons easy to understand and apply. Highly recommend to anyone seeking growth.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-base-200/50 to-base-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            What Our Community Says
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6 flex items-center justify-center gap-3 flex-wrap">
            <FaQuoteLeft className="text-primary text-lg sm:text-xl md:text-2xl" />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Life-Changing Stories
            </span>
            <FaQuoteRight className="text-primary text-lg sm:text-xl md:text-2xl" />
          </h2>
          
          <p className="text-base-content/70 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover how our community members have transformed their lives through shared wisdom and meaningful connections
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-base-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-base-300/50 hover:border-primary/20 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <FaQuoteLeft className="text-white text-sm" />
                </div>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-primary/20 shadow-md group-hover:border-primary/40 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {Array(testimonial.rating)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} className="text-warning text-sm" />
                      ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-base-content/80 text-sm sm:text-base leading-relaxed italic relative">
                "{testimonial.text}"
              </blockquote>

              {/* Decorative Element */}
              <div className="absolute bottom-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <FaQuoteRight className="text-4xl text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button className="btn btn-primary btn-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
              <FaThumbsUp className="text-lg" />
              <span className="font-semibold">Share Your Story</span>
            </button>
            
            <div className="flex items-center gap-2 text-base-content/60 text-sm">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t, i) => (
                  <img
                    key={i}
                    src={t.image}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-base-100 object-cover"
                  />
                ))}
              </div>
              <span>Join our happy members</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;