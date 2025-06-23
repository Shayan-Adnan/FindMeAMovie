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
      <div className="container mx-auto h-20 relative text-white text-xl px-6">
        {/* Desktop: Grid layout for true centering, Mobile: Flex layout for proper right alignment */}
        <div className="md:grid md:grid-cols-3 flex justify-between h-full items-center">
          {/* Left - Logo */}
          <div className="flex justify-start">
            <Link to="/">
              <div className="flex items-center w-36 md:w-40 h-20">
                <img
                  src="logo-img.png"
                  alt="Logo"
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>
          </div>

          {/* Center - Search Bar (true center) - only visible on larger screens */}
          <div className="hidden md:flex justify-center">
            <SearchBar />
          </div>

          {/* Right side container - always visible */}
          <div className="flex justify-end">
            {/* Desktop Nav - only visible on md and up */}
            <div className="hidden md:flex items-center justify-end space-x-8">
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

            {/* Mobile Toggle - only visible below md */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none transition-transform duration-300"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[80px] left-0 w-full bg-slate-900/95 backdrop-blur-md text-white flex flex-col items-center space-y-6 py-6 transition-all duration-300 ease-in-out z-50 shadow-lg">
          <div className="w-full px-6 pb-4">
            <SearchBar />
          </div>
          {!user ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition duration-300 text-2xl"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to={`/profile/${user.userId}`}
                onClick={() => setIsOpen(false)}
                className="hover:text-cyan-400 transition duration-300 flex items-center space-x-3 text-2xl"
              >
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="rounded-full w-10 h-10 object-cover border-2 border-cyan-400"
                />
                <span>{user.name}</span>
              </Link>
              <Link to={"/createList"} onClick={() => setIsOpen(false)}>
                <button className="hover:text-cyan-400 transition duration-300 cursor-pointer text-2xl">
                  Create List
                </button>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="hover:text-cyan-400 transition duration-300 text-2xl"
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
