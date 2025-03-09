import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/results", { state: { searchBarQuery: searchQuery } });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-white text-lg outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!searchQuery}
          className={`${
            searchQuery ? "" : "cursor-not-allowed opacity-50"
          } bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-600 hover:to-indigo-600  text-white py-2 px-4 rounded-full transition duration-300`}
        >
          <img
            src="magnifying-glass.png"
            className="w-5 h-5 md:w-6 md:h-6"
          ></img>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
