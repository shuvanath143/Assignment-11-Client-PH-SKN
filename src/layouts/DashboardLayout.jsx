import React from "react";
import {
  FaBook,
  FaHeart,
  FaUser,
  FaUsers,
  FaChartBar,
  FaRegCreditCard,
  FaFlag,
} from "react-icons/fa";
import { MdMenu } from "react-icons/md";

import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";


const DashboardLayout = () => {
  const { role } = useRole();
  // const { theme } = useTheme()

  const navClass = ({ isActive }) =>
    isActive ? "bg-primary text-white" : "hover:bg-base-300";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= Main Content ================= */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <nav className="navbar bg-base-200 shadow-sm px-4 md:px-6">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden mr-2"
            >
              <MdMenu size={20} />
            </label>
            <h2 className="text-lg md:text-xl font-semibold">
              Welcome to Digital Life Lessons Platform
            </h2>
          </div>
        </nav>

        {/* Page Content */}
        <div className="px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </div>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-100 border-r min-h-full">
          <ul className="menu p-4 md:p-6 gap-2">
            {/* Home */}
            <li>
              <Link to="/" className="font-medium py-2 md:py-3">
                🏠 Home
              </Link>
            </li>

            {/* ================= USER DASHBOARD ================= */}
            {role === "user" && (
              <>
                <li className="menu-title mt-4 mb-2">User Dashboard</li>

                <li>
                  <NavLink to="/dashboard/user" className={navClass}>
                    <FaChartBar /> Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/my-lessons" className={navClass}>
                    <FaBook /> My Lessons
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/my-favorites" className={navClass}>
                    <FaHeart /> My Favorites
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/profile" className={navClass}>
                    <FaUser /> Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/payment-history" className={navClass}>
                    <FaRegCreditCard /> Payment History
                  </NavLink>
                </li>
              </>
            )}

            {/* ================= ADMIN DASHBOARD ================= */}
            {role === "admin" && (
              <>
                <li className="menu-title mt-4 mb-2">Admin Dashboard</li>

                <li>
                  <NavLink to="/dashboard/admin" className={navClass}>
                    <FaChartBar /> Overview
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/manage-users"
                    className={navClass}
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/lesson-management"
                    className={navClass}
                  >
                    <FaBook /> Lesson Management
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/admin/report-management"
                    className={navClass}
                  >
                    <FaFlag /> Reports
                  </NavLink>
                </li>
                <li>
                  {/* <ThemeToggle /> */}
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
