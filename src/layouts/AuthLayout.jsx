import React from 'react';
import Logo from "../components/logo/Logo"
import authImg from "../assets/authImage.png"
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Logo></Logo>
            <div className='flex justify-center items-center'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImg} alt="AuthImage" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;