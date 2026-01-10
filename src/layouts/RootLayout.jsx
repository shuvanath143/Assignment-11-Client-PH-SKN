import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
      <div className="min-h-screen bg-base-100 text-base-content">
        <Navbar />
        <main className="mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
};

export default RootLayout;