import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/home');
    setMenuOpen(false); // Close the menu after logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Navbar Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-sky-100">
          TraveloSpace🍁
        </Link>

        {/* Toggle Button for Small Screens */}
        <button className="md:hidden" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>

        {/* Menu for Larger Screens */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/home" className="text-lg font-medium hover:text-sky-100 transition duration-200">
            Home
          </Link>
          <Link to="/homescreen" className="text-lg font-medium hover:text-sky-100 transition duration-200">
            Hotel
          </Link>
          <Link to="/review" className="text-lg font-medium hover:text-sky-100 transition duration-200">
            Reviews
          </Link>
          <Link to="/imggallery" className="text-lg font-medium hover:text-sky-100 transition duration-200">
            ImageGallery
          </Link>
          <Link to="/mybookings" className="text-lg font-medium hover:text-sky-100 transition duration-200">
            Bookings
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="text-lg font-medium hover:text-sky-100 transition duration-200">
              AdminPanel
            </Link>
          )}
          <Link to="/profile" className="text-lg font-medium hover:text-sky-100 transition duration-200">
            Profile
          </Link>

          {user ? (
            <>
              <FontAwesomeIcon icon={faUser} className="text-xl bg text-blue-500" />
              <p className="text-lg text-blue-500">Welcome, {user.username}</p>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-white transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Dropdown Menu for Small Screens */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start bg-sky-500 text-white px-6 py-3 space-y-2 shadow-md">
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-sky-100 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/homescreen"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-sky-100 transition duration-200"
          >
            Hotel
          </Link>
          <Link
            to="/review"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-sky-100 transition duration-200"
          >
            Reviews
          </Link>
          <Link
            to="/imggallery"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-sky-100 transition duration-200"
          >
            ImageGallery
          </Link>
          <Link
            to="/mybookings"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-sky-100 transition duration-200"
          >
            Bookings
          </Link>
          {user?.isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium hover:text-sky-100 transition duration-200"
            >
              AdminPanel
            </Link>
          )}
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-sky-100 transition duration-200"
          >
            Profile
          </Link>

          {user ? (
            <>
              <p className="text-lg">Welcome, {user.username}</p>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
