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
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { role } = useRole(); // "admin" | "user"
  const { isPremium } = usePremium();

  const [showProfile, setShowProfile] = useState(false);

  const activeClass = "text-primary font-semibold border-b-2 border-primary"; // Primary color
  const normalClass = "text-base-content hover:text-primary transition"; // Base content + primary on hover

  return (
    <nav className="bg-base-200 shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left */}
      <Link
        to="/"
        className="text-xl font-bold text-primary hover:bg-primary-focus px-2 py-1 rounded"
      >
        LifeLessons
      </Link>

      {/* Middle Links */}
      <div className="flex items-center gap-6">
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
            Public Lesson
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
            <span className="px-3 py-1 bg-accent text-accent-content rounded-full text-sm font-semibold">
              Premium
            </span>
          ) : (
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Free
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
            <button className="font-medium text-base-content hover:text-primary">
              Dashboard ▾
            </button>

            <div
              className="absolute left-0 top-full w-52 shadow-lg rounded-md
                         opacity-0 scale-95 pointer-events-none
                         group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                         transition-all duration-200 z-50 bg-base-200 border border-base-300"
            >
              <NavLink
                to="/dashboard/user"
                className="block px-4 py-2 hover:bg-base-300 text-base-content"
              >
                Overview
              </NavLink>

              {role === "admin" ? (
                <>
                  <NavLink
                    to="/dashboard/admin/manage-users"
                    className="block px-4 py-2 hover:bg-base-300 text-base-content"
                  >
                    User Management
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/lesson-management"
                    className="block px-4 py-2 hover:bg-base-300 text-base-content"
                  >
                    Lessons Management
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/report-management"
                    className="block px-4 py-2 hover:bg-base-300 text-base-content"
                  >
                    Reports Management
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard/my-lessons"
                    className="block px-4 py-2 hover:bg-base-300 text-base-content"
                  >
                    My Lessons
                  </NavLink>
                  <NavLink
                    to="/dashboard/favorites"
                    className="block px-4 py-2 hover:bg-base-300 text-base-content"
                  >
                    My Favorites
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right - Profile / Login */}
      <div className="relative flex items-center gap-4">
        {!user ? (
          <NavLink
            to="/login"
            className="px-4 py-2 bg-primary text-primary-content rounded-md hover:bg-primary-focus"
          >
            Login
          </NavLink>
        ) : (
          <div
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
            className="relative"
          >
            <img
              src={user.photoURL}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
            />

            <div
              className={`absolute right-0 w-64 shadow-lg rounded-md p-4
                transform transition-all duration-300 bg-base-200 border border-base-300 ${
                  showProfile
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <img
                  src={user.photoURL}
                  className="w-16 h-16 rounded-full mb-2"
                  alt="avatar"
                />
                <h3 className="font-semibold text-base-content">
                  {user.displayName || "Anonymous User"}
                </h3>
                <p className="text-sm text-base-content">{user.email}</p>
                <NavLink to="/dashboard/profile" className="btn btn-primary">View Profile</NavLink>
                <button
                  onClick={logout}
                  className="btn btn-sm btn-error mt-3 text-white bg-error hover:bg-error-focus"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 cursor-pointer hover:text-primary"
        >
          {theme === "light" ? (
            <>
              <MdDarkMode size={22} /> Dark
            </>
          ) : (
            <>
              <MdLightMode size={22} /> Light
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
