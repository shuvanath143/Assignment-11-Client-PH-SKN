import React from 'react';
import { FaWhatsapp, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="text-base-content/70 text-sm text-center sm:text-left">
            © {currentYear} Digital Life Lessons. All rights reserved.
          </div>

          {/* Contact & Back to Top */}
          <div className="flex items-center gap-4">
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801630165138"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base-content/70 hover:text-green-500 transition-colors duration-300"
              aria-label="Contact via WhatsApp"
            >
              <FaWhatsapp className="text-lg" />
              <span className="text-sm hidden sm:inline">WhatsApp</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shuva-kumar-nath-skn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base-content/70 hover:text-blue-600 transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn className="text-lg" />
              <span className="text-sm hidden sm:inline">LinkedIn</span>
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-300 hover:scale-105"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-sm" />
              <span className="text-sm hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;