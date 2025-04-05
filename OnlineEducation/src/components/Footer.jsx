import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
         
          <div>
            <h3 className="text-xl font-semibold">Smart Interactive Learning</h3>
            <p className="text-gray-400 mt-2">
              Revolutionizing online learning with AI-powered engagement.
            </p>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><Link to={`/home`} href="#" className="text-gray-400 hover:text-blue-400">Home</Link></li>
              <li><Link to={``} href="#" className="text-gray-400 hover:text-blue-400">About Us</Link></li>
              <li><Link to={``} href="#" className="text-gray-400 hover:text-blue-400">Courses</Link></li>
              <li><Link to={``} href="#" className="text-gray-400 hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p className="text-gray-400 mt-2">📧 Email: support@smartlearning.com</p>
            <p className="text-gray-400">📞 Phone: +123 456 7890</p>
            <div className="flex justify-center md:justify-start mt-3 space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">🔗 LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">🐦 Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">📘 Facebook</a>
            </div>
          </div>

        </div>
        <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
          © 2025 Smart Interactive Learning. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
