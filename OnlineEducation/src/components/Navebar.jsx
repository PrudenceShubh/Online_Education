import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleConnect = () => {
    navigate('/connect');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Vidha-mitra</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-semibold">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li>
          </li>
          <li><Link to="/progress" className="hover:text-blue-400">Progress</Link></li>
          <li><Link to="/account" className="hover:text-blue-400">Account</Link></li>
            <button 
              onClick={handleConnect} 
              className="hover:text-blue-400 bg-blue-600 px-4 py-2 rounded-lg"
            >
              Connect Live
            </button>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="md:hidden p-4 flex flex-col gap-3 text-end">
          <Link to="/" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Home</Link>
          <button 
            onClick={handleConnect}
            className="hover:text-blue-400 bg-blue-600 px-4 py-2 rounded-lg text-center"
          >
            Connect Live
          </button>
          <Link to="/progress" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Progress</Link>
          <Link to="/account" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Account</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
