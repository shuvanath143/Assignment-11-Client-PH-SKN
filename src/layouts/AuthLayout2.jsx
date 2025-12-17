import React from "react";
import Logo from "../components/logo/Logo";
import authImg from "../assets/authImage.png";
import { Outlet } from "react-router";
import Card from "../components/Card/Card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <Logo />

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
        {/* Login / Register */}
        <div className="flex-1 flex justify-center">
          <Outlet />
        </div>

        {/* Decorative Card */}
        <div className="flex-1 hidden lg:flex items-center justify-center relative">
          {/* Glow */}
          <div className="absolute w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-[#bf0fff]/30 to-[#ff1b6b]/30" />

          {/* Scale wrapper */}
          <div className="scale-125">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
