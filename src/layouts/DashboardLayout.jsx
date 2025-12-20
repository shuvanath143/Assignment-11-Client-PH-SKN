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
        <nav className="navbar bg-base-200 shadow-sm">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost lg:hidden"
          >
            ☰
          </label>
          <h2 className="text-lg font-semibold px-4">
            Welcome to Digital Life Lessons Platform
          </h2>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-100 border-r min-h-full">
          <ul className="menu p-4 gap-1">
            {/* Home */}
            <li>
              <Link to="/" className="font-medium">
                🏠 Home
              </Link>
            </li>

            {/* ================= USER DASHBOARD ================= */}
            {role === "user" && (
              <>
                <li className="menu-title">User Dashboard</li>

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
                <li className="menu-title">Admin Dashboard</li>

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
