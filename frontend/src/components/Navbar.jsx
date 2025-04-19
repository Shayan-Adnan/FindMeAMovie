import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  //need to load this from env later
  const SERVER_URL = `http://localhost:3000`;

  const login = () => {
    window.location.href = `${SERVER_URL}/auth/login/google`;
  };

  return (
    <nav className="w-full py-4 font-bebas-neue bg-gradient-to-r from-slate-800 to-slate-700 shadow-md">
      <div className="flex items-center justify-between text-white text-xl px-5">
        <h1 className="text-3xl">FindMeAMovie</h1>
        <div className="hidden md:flex space-x-6">
          <button className="hover:text-cyan-400 transition" onClick={login}>
            Login
          </button>
          <Link>Profile Name</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-slate-900/90 backdrop-blur-md text-white flex flex-col items-center space-y-4 py-6 transition-all duration-300 ease-in-out`}
        >
          <Link
            to="/options"
            onClick={() => setIsOpen(false)}
            className="hover:text-cyan-400 transition"
          >
            Login
          </Link>
          <Link>Logout</Link>
          <Link>Profile Name</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
