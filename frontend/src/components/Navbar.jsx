import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import SearchBar from "../components/SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="w-full font-bebas-neue bg-gradient-to-r from-slate-900 to-slate-800 shadow-md relative">
      <div className="flex items-center justify-between px-6 text-white text-xl h-20 relative">
        {/* Left - Logo */}
        <Link to="/">
          <div className="flex items-center w-36 md:w-40 h-20 md:h-22">
            <img
              src="logo-img.png"
              alt="Logo"
              className="object-contain w-full h-full"
            />
          </div>
        </Link>

        {/* Center - Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-64 md:w-96">
          <SearchBar />
        </div>

        {/* Right - Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {!user ? (
            <Link to="/login">
              <button className="hover:text-cyan-400 transition duration-300">
                Login
              </button>
            </Link>
          ) : (
            <>
              <Link to={`/profile/${user.userId}`}>
                <div className="flex items-center space-x-3 hover:text-cyan-400 transition duration-300">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="rounded-full w-10 h-10 object-cover border-2 border-cyan-400"
                  />
                  <span>{user.name}</span>
                </div>
              </Link>
              <Link to={"/createList"}>
                <button className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Create List
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-cyan-400 transition duration-300 cursor-pointer"
              >
                <IoMdLogOut />
              </button>
            </>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none transition-transform duration-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[80px] left-0 w-full bg-slate-900/90 backdrop-blur-md text-white flex flex-col items-center space-y-6 py-6 transition-all duration-300 ease-in-out z-50">
          {!user ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition duration-300"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to={`/profile/${user.userId}`}
                onClick={() => setIsOpen(false)}
                className="hover:text-cyan-400 transition duration-300"
              >
                {user.name}
              </Link>
              <Link to={"/createList"}>
                <button className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                  Create List
                </button>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="hover:text-cyan-400 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
