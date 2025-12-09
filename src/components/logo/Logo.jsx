import React from 'react';
import logo from "../../assets/logo.jpg"

const Logo = () => {
    return (
        <div className='flex items-center gap-5'>
            <img src={logo} alt="" className='h-16 w-16'/>
            <h3 className="text-3xl font-bold -ms-2.5">Digital Life Lessons</h3>
        </div>
    );
};

export default Logo;