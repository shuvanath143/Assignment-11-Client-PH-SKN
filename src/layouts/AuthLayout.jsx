import React from 'react';
import Logo from "../components/logo/Logo"
import authImg from "../assets/authImage.png"
import { Outlet } from 'react-router';
import Card from '../components/Card/Card';

const AuthLayout = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-black">
        <Logo></Logo>
        <div className="flex justify-center items-center">
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
          {/* <div className='flex-1'>
                    <img src={authImg} alt="AuthImage" />
                    <Card/>
                </div> */}
        </div>
      </div>
    );
};

export default AuthLayout;