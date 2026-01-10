// import React from 'react';
// import { Link } from 'react-router';
// import Logo from '../../../components/logo/Logo';
// import { 
//   FaFacebookF, 
//   FaTwitter, 
//   FaInstagram, 
//   FaLinkedinIn, 
//   FaYoutube,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaHeart,
//   FaArrowUp,
//   FaBook,
//   FaUsers,
//   FaGraduationCap,
//   FaStar
// } from 'react-icons/fa';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <footer className="relative bg-gradient-to-br from-base-200 via-base-300 to-base-200 text-base-content">
//       {/* Decorative Top Border */}
//       <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
//       {/* Main Footer Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
//           {/* Company Info Section */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="transform hover:scale-105 transition-transform duration-300">
//               <Logo />
//             </div>
            
//             <p className="text-base-content/80 leading-relaxed text-sm sm:text-base">
//               Empowering lives through shared wisdom and authentic storytelling. 
//               Join our community of learners and discover the transformative power of life lessons.
//             </p>
            
//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center p-3 bg-base-100/50 rounded-lg border border-base-300/50">
//                 <div className="text-lg sm:text-xl font-bold text-primary">10K+</div>
//                 <div className="text-xs text-base-content/70">Members</div>
//               </div>
//               <div className="text-center p-3 bg-base-100/50 rounded-lg border border-base-300/50">
//                 <div className="text-lg sm:text-xl font-bold text-secondary">5K+</div>
//                 <div className="text-xs text-base-content/70">Lessons</div>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-6">
//             <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
//               <FaBook className="text-primary" />
//               Explore
//             </h3>
//             <ul className="space-y-3">
//               {[
//                 { name: 'Browse Lessons', path: '/' },
//                 { name: 'Categories', path: '/categories' },
//                 { name: 'Featured Stories', path: '/featured' },
//                 { name: 'Premium Content', path: '/premium' },
//                 { name: 'Community', path: '/community' },
//                 { name: 'Success Stories', path: '/testimonials' }
//               ].map((link, index) => (
//                 <li key={index}>
//                   <Link 
//                     to={link.path}
//                     className="text-base-content/70 hover:text-primary transition-colors duration-300 text-sm sm:text-base flex items-center gap-2 group"
//                   >
//                     <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Account & Support */}
//           <div className="space-y-6">
//             <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
//               <FaUsers className="text-secondary" />
//               Account
//             </h3>
//             <ul className="space-y-3">
//               {[
//                 { name: 'Sign In', path: '/login' },
//                 { name: 'Create Account', path: '/register' },
//                 { name: 'Dashboard', path: '/dashboard' },
//                 { name: 'My Lessons', path: '/dashboard/my-lessons' },
//                 { name: 'Favorites', path: '/dashboard/my-favorites' },
//                 { name: 'Profile Settings', path: '/dashboard/profile' }
//               ].map((link, index) => (
//                 <li key={index}>
//                   <Link 
//                     to={link.path}
//                     className="text-base-content/70 hover:text-secondary transition-colors duration-300 text-sm sm:text-base flex items-center gap-2 group"
//                   >
//                     <span className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact & Newsletter */}
//           <div className="space-y-6">
//             <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
//               <FaEnvelope className="text-accent" />
//               Connect
//             </h3>
            
//             {/* Contact Info */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-3 text-base-content/70 text-sm sm:text-base">
//                 <FaEnvelope className="text-accent flex-shrink-0" />
//                 <span>hello@digitallifelessons.com</span>
//               </div>
//               <div className="flex items-center gap-3 text-base-content/70 text-sm sm:text-base">
//                 <FaPhone className="text-accent flex-shrink-0" />
//                 <span>+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center gap-3 text-base-content/70 text-sm sm:text-base">
//                 <FaMapMarkerAlt className="text-accent flex-shrink-0" />
//                 <span>San Francisco, CA</span>
//               </div>
//             </div>

//             {/* Newsletter Signup */}
//             <div className="bg-base-100/50 p-4 rounded-lg border border-base-300/50">
//               <h4 className="font-semibold text-base-content mb-3 text-sm sm:text-base">
//                 Weekly Wisdom Newsletter
//               </h4>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <input 
//                   type="email" 
//                   placeholder="Your email"
//                   className="flex-1 px-3 py-2 text-sm border border-base-300 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary/50 focus:border-primary"
//                 />
//                 <button className="btn btn-primary btn-sm px-4 whitespace-nowrap">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Social Media & Bottom Section */}
//         <div className="mt-12 pt-8 border-t border-base-300/50">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
//             {/* Social Media Links */}
//             <div className="flex items-center gap-4">
//               <span className="text-base-content/70 text-sm font-medium">Follow Us:</span>
//               <div className="flex gap-3">
//                 {[
//                   { icon: FaFacebookF, color: 'hover:text-blue-600', label: 'Facebook' },
//                   { icon: FaTwitter, color: 'hover:text-sky-500', label: 'Twitter' },
//                   { icon: FaInstagram, color: 'hover:text-pink-500', label: 'Instagram' },
//                   { icon: FaLinkedinIn, color: 'hover:text-blue-700', label: 'LinkedIn' },
//                   { icon: FaYoutube, color: 'hover:text-red-600', label: 'YouTube' }
//                 ].map((social, index) => (
//                   <a
//                     key={index}
//                     href="#"
//                     aria-label={social.label}
//                     className={`w-10 h-10 bg-base-100 border border-base-300 rounded-full flex items-center justify-center text-base-content/70 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
//                   >
//                     <social.icon className="text-sm" />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Back to Top Button */}
//             <button
//               onClick={scrollToTop}
//               className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-content transition-all duration-300 hover:scale-105 text-sm font-medium"
//             >
//               <FaArrowUp className="text-xs" />
//               Back to Top
//             </button>
//           </div>
//         </div>

//         {/* Copyright & Legal */}
//         <div className="mt-8 pt-6 border-t border-base-300/50">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/60">
//             <div className="flex items-center gap-2">
//               <span>© {currentYear} Digital Life Lessons. Made with</span>
//               <FaHeart className="text-red-500 animate-pulse" />
//               <span>for personal growth.</span>
//             </div>
            
//             <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//               <Link to="/privacy" className="hover:text-primary transition-colors duration-300">
//                 Privacy Policy
//               </Link>
//               <Link to="/terms" className="hover:text-primary transition-colors duration-300">
//                 Terms of Service
//               </Link>
//               <Link to="/cookies" className="hover:text-primary transition-colors duration-300">
//                 Cookie Policy
//               </Link>
//               <Link to="/help" className="hover:text-primary transition-colors duration-300">
//                 Help Center
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
//         <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
//         <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full"></div>
//         <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent rounded-full"></div>
//         <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary/50 rounded-full"></div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;