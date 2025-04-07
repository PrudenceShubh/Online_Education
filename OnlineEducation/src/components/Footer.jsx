import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaUserGraduate, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  // Function to scroll to a specific section on the home page
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Smart Interactive Learning</h3>
            <p className="text-white-500 mb-4">
              Revolutionizing online learning with AI-powered engagement.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-blue-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-pink-500 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-blue-600 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white-500 hover:text-white transition-colors flex items-center">
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('courses-section')} 
                  className="text-white-500 hover:text-white transition-colors flex items-center"
                >
                  <FaBook className="mr-2" /> Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about-section')} 
                  className="text-white-500 hover:text-white transition-colors flex items-center"
                >
                  <FaUserGraduate className="mr-2" /> About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('footer')} 
                  className="text-white-500 hover:text-white transition-colors flex items-center"
                >
                  <FaEnvelope className="mr-2" /> Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-white-500">
                <FaPhone className="mr-2" /> +123 456 7890
              </li>
              <li className="flex items-center text-white-500">
                <FaEnvelope className="mr-2" /> support@smartlearning.com
              </li>
              <li className="flex items-center text-white-500">
                <FaMapMarkerAlt className="mr-2" /> 123 Education St, Learning City
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-white-500 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md text-white font-medium transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-white-500">
          <p>&copy; {new Date().getFullYear()} Smart Interactive Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
