// import React, { useState } from "react";
// import Logo from "../../../components/logo/Logo";
// import { Link, NavLink } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";
// import usePremium from "../../../hooks/usePremium";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { role, roleLoading } = useRole();
//   const { isPremium } = usePremium()
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     logout()
//       .then()
//       .catch((e) => console.log(e));
//   };

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "text-primary font-semibold"
//       : "text-base-content hover:text-primary";

//   const links = (
//     <>
//       <li>
//         <NavLink to="/" className={navLinkClass}>
//           Home
//         </NavLink>
//       </li>

//       <li>
//         <NavLink to="/dashboard/add-lesson" className={navLinkClass}>
//           Add Lesson
//         </NavLink>
//       </li>

//       {role === "user" && (
//         <li className="dropdown dropdown-hover">
//           <div
//             tabIndex={0}
//             className="cursor-pointer font-medium flex items-center gap-1"
//           >
//             Dashboard
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </div>

//           <ul
//             tabIndex={0}
//             className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 mt-2"
//           >
//             <li>
//               <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/my-favorites">My Favorites</NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/pricing">
//                 {isPremium ? (
//                   <span className="badge badge-success badge-sm">Premium</span>
//                 ) : (
//                   <span className="badge badge-ghost badge-sm">Free</span>
//                 )}
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/profile">Profile</NavLink>
//             </li>
//           </ul>
//         </li>
//       )}

//       <li>
//         <NavLink to="/public-lessons" className={navLinkClass}>
//           Public Lessons
//         </NavLink>
//       </li>

//       {role === "admin" && (
//         <li className="dropdown dropdown-hover">
//           <div tabIndex={0} className="cursor-pointer font-medium">
//             Dashboard
//           </div>

//           <ul
//             tabIndex={0}
//             className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 mt-2"
//           >
//             <li>
//               <NavLink to="/dashboard/admin">Admin Dashboard</NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/admin/manage-users">
//                 User Management
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/admin/lesson-management">
//                 Lesson Management
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/admin/report-management">
//                 Report Management
//               </NavLink>
//             </li>
//           </ul>
//         </li>
//       )}
//     </>
//   );

//   return (
//     <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md px-4">
//       {/* Left */}
//       <div className="navbar-start gap-2">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </label>

//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56"
//           >
//             {links}
//           </ul>
//         </div>

//         <Link to="/" className="flex items-center gap-2">
//           <Logo />
//         </Link>
//       </div>

//       {/* Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal gap-4">{links}</ul>
//       </div>

//       {/* Right */}
//       <div className="navbar-end relative">
//         {user ? (
//           <div className="relative">
//             <div
//               className="avatar cursor-pointer"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             >
//               <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                 <img
//                   src={
//                     user.photoURL ||
//                     "https://i.ibb.co/2FsfXqM/default-avatar.png"
//                   }
//                   alt="user avatar"
//                 />
//               </div>
//             </div>

//             {/* Dropdown */}
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-xl shadow-lg p-3 z-50 border border-base-200">
//                 <div className="flex flex-col items-center gap-1 text-center">
//                   <img
//                     src={
//                       user.photoURL ||
//                       "https://i.ibb.co/2FsfXqM/default-avatar.png"
//                     }
//                     alt="avatar"
//                     className="w-16 h-16 rounded-full mb-2"
//                   />
//                   <h3 className="font-semibold">
//                     {user.displayName || "Anonymous User"}
//                   </h3>
//                   <p className="text-sm text-gray-500">{user.email}</p>
//                   <button
//                     onClick={handleLogout}
//                     className="btn btn-sm btn-error mt-3 text-white"
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link to="/register" className="btn">
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { NavLink, Link } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import usePremium from "../../../hooks/usePremium";
import useTheme from "../../../hooks/useTheme";
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from "react-icons/md";
import { FaChevronDown, FaUser, FaSignOutAlt, FaCrown } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole(); // "admin" | "user"
  const { isPremium } = usePremium();

  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);

  const activeClass = "text-primary font-semibold bg-primary/10 px-3 py-2 rounded-lg";
  const normalClass = "text-base-content hover:text-primary hover:bg-base-200 px-3 py-2 rounded-lg transition-all duration-200";

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDashboardDropdownOpen(false);
  };

  return (
    <nav className="bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-primary hover:text-primary-focus transition-colors duration-200 flex-shrink-0 flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-content font-bold text-sm">LL</span>
            </div>
            LifeLessons
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Home
            </NavLink>

            <NavLink
              to="/public-lessons"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Public Lessons
            </NavLink>

            <NavLink
              to="/dashboard/add-lesson"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Add Lesson
            </NavLink>

            {/* Pricing / Premium */}
            {user &&
              role !== "admin" &&
              (isPremium ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded-lg">
                  <FaCrown className="w-4 h-4" />
                  <span className="text-sm font-semibold">Premium</span>
                </div>
              ) : (
                <NavLink
                  to="/pricing"
                  className="px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-lg hover:from-accent/90 hover:to-secondary/90 transition-all duration-200 font-medium"
                >
                  Upgrade
                </NavLink>
              ))}

            {!user && (
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? activeClass : normalClass)}
              >
                Pricing
              </NavLink>
            )}

            {/* Dashboard Dropdown */}
            {user && (
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 font-medium text-base-content hover:text-primary hover:bg-base-200 rounded-lg transition-all duration-200">
                  Dashboard
                  <FaChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className="absolute left-0 top-full mt-2 w-52 bg-base-100 shadow-xl rounded-xl border border-base-300 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="py-2">
                    <NavLink
                      to="/dashboard/user"
                      className="block px-4 py-3 text-sm hover:bg-base-200 text-base-content transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Overview
                      </div>
                    </NavLink>

                    {role === "admin" ? (
                      <>
                        <NavLink
                          to="/dashboard/admin/manage-users"
                          className="block px-4 py-3 text-sm hover:bg-base-200 text-base-content transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            User Management
                          </div>
                        </NavLink>
                        <NavLink
                          to="/dashboard/admin/lesson-management"
                          className="block px-4 py-3 text-sm hover:bg-base-200 text-base-content transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            Lessons Management
                          </div>
                        </NavLink>
                        <NavLink
                          to="/dashboard/admin/report-management"
                          className="block px-4 py-3 text-sm hover:bg-base-200 text-base-content transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-warning rounded-full"></div>
                            Reports Management
                          </div>
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/dashboard/my-lessons"
                          className="block px-4 py-3 text-sm hover:bg-base-200 text-base-content transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            My Lessons
                          </div>
                        </NavLink>
                        <NavLink
                          to="/dashboard/my-favorites"
                          className="block px-4 py-3 text-sm hover:bg-base-200 text-base-content transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            My Favorites
                          </div>
                        </NavLink>
                        <NavLink
                          to="/dashboard/profile"
                          className="block px-4 py-3 text-sm hover:bg-base-200 text-base-content transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-info rounded-full"></div>
                            Profile
                          </div>
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-base-200 transition-colors duration-200 border border-base-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MdDarkMode size={20} className="text-base-content" />
              ) : (
                <MdLightMode size={20} className="text-base-content" />
              )}
            </button>

            {/* User Profile or Login */}
            {!user ? (
              <NavLink
                to="/login"
                className="px-6 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition-colors duration-200 font-medium shadow-lg"
              >
                Login
              </NavLink>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setShowProfile(true)}
                onMouseLeave={() => setShowProfile(false)}
              >
                <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-base-200 transition-colors duration-200 cursor-pointer">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="profile"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                  />
                  {isPremium && (
                    <FaCrown className="w-4 h-4 text-accent" />
                  )}
                </div>

                <div
                  className={`absolute right-0 top-full mt-2 w-72 bg-base-100 shadow-xl rounded-xl border border-base-300 p-6 transform transition-all duration-300 ${
                    showProfile
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/64"}
                        className="w-16 h-16 rounded-full border-3 border-primary shadow-lg"
                        alt="avatar"
                      />
                      {isPremium && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <FaCrown className="w-3 h-3 text-accent-content" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content text-lg">
                        {user.displayName || "Anonymous User"}
                      </h3>
                      <p className="text-sm text-base-content/70">{user.email}</p>
                      {isPremium && (
                        <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-accent to-secondary text-white rounded-full text-xs font-semibold">
                          ⭐ Premium Member
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 w-full">
                      <NavLink
                        to="/dashboard/profile"
                        className="flex-1 btn btn-primary btn-sm"
                        onClick={() => setShowProfile(false)}
                      >
                        <FaUser className="w-3 h-3" />
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex-1 btn btn-error btn-sm"
                      >
                        <FaSignOutAlt className="w-3 h-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MdDarkMode size={20} />
              ) : (
                <MdLightMode size={20} />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <MdClose size={24} />
              ) : (
                <MdMenu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-base-200 rounded-xl mt-2 shadow-lg border border-base-300">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-300"
                }`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>

            <NavLink
              to="/public-lessons"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-300"
                }`
              }
              onClick={closeMobileMenu}
            >
              Public Lessons
            </NavLink>

            <NavLink
              to="/dashboard/add-lesson"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-base-300"
                }`
              }
              onClick={closeMobileMenu}
            >
              Add Lesson
            </NavLink>

            {/* Mobile Pricing/Premium */}
            {user && role !== "admin" && !isPremium && (
              <NavLink
                to="/pricing"
                className="block px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-accent to-secondary text-white hover:from-accent/90 hover:to-secondary/90 transition-all duration-200"
                onClick={closeMobileMenu}
              >
                Upgrade to Premium
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content hover:bg-base-300"
                  }`
                }
                onClick={closeMobileMenu}
              >
                Pricing
              </NavLink>
            )}

            {/* Mobile Dashboard Section */}
            {user && (
              <div className="border-t border-base-300 pt-3 mt-3">
                <button
                  onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium text-base-content hover:bg-base-300 transition-colors duration-200"
                >
                  Dashboard
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      dashboardDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    dashboardDropdownOpen
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="pl-6 space-y-1">
                    <NavLink
                      to="/dashboard/user"
                      className="block px-4 py-2 rounded-lg text-sm text-base-content hover:bg-base-300 transition-colors duration-200"
                      onClick={closeMobileMenu}
                    >
                      Overview
                    </NavLink>

                    {role === "admin" ? (
                      <>
                        <NavLink
                          to="/dashboard/admin/manage-users"
                          className="block px-4 py-2 rounded-lg text-sm text-base-content hover:bg-base-300 transition-colors duration-200"
                          onClick={closeMobileMenu}
                        >
                          User Management
                        </NavLink>
                        <NavLink
                          to="/dashboard/admin/lesson-management"
                          className="block px-4 py-2 rounded-lg text-sm text-base-content hover:bg-base-300 transition-colors duration-200"
                          onClick={closeMobileMenu}
                        >
                          Lessons Management
                        </NavLink>
                        <NavLink
                          to="/dashboard/admin/report-management"
                          className="block px-4 py-2 rounded-lg text-sm text-base-content hover:bg-base-300 transition-colors duration-200"
                          onClick={closeMobileMenu}
                        >
                          Reports Management
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/dashboard/my-lessons"
                          className="block px-4 py-2 rounded-lg text-sm text-base-content hover:bg-base-300 transition-colors duration-200"
                          onClick={closeMobileMenu}
                        >
                          My Lessons
                        </NavLink>
                        <NavLink
                          to="/dashboard/my-favorites"
                          className="block px-4 py-2 rounded-lg text-sm text-base-content hover:bg-base-300 transition-colors duration-200"
                          onClick={closeMobileMenu}
                        >
                          My Favorites
                        </NavLink>
                        <NavLink
                          to="/dashboard/profile"
                          className="block px-4 py-2 rounded-lg text-sm text-base-content hover:bg-base-300 transition-colors duration-200"
                          onClick={closeMobileMenu}
                        >
                          Profile
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile User Section */}
            {user ? (
              <div className="border-t border-base-300 pt-3 mt-3">
                <div className="flex items-center px-4 py-3 bg-base-300 rounded-lg">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/32"}
                    alt="profile"
                    className="w-8 h-8 rounded-full border-2 border-primary mr-3"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-base-content">
                      {user.displayName || "Anonymous User"}
                    </div>
                    <div className="text-xs text-base-content/70">{user.email}</div>
                  </div>
                  {isPremium && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                      <FaCrown className="w-3 h-3" />
                      Premium
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-error hover:bg-base-300 transition-colors duration-200 mt-2"
                >
                  <FaSignOutAlt className="inline w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-base-300 pt-3 mt-3">
                <NavLink
                  to="/login"
                  className="block w-full px-4 py-3 rounded-lg text-base font-medium bg-primary text-primary-content hover:bg-primary-focus transition-colors duration-200 text-center"
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
