import { useState } from "react";
import SelectedMoviesPreview from "../components/SelectedMoviesPreview";
import ListMovieSearch from "../components/ListMovieSearch";
import axios from "axios";

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedMovies.length < 3) {
        setSuccessMessage("List must contain at least three films!");
        return;
      }

      // const listAlreadyExists = checkIfListAlreadyExists();

      // if (listAlreadyExists) {
      //   setSuccessMessage("You already have a list with this name!");
      //   return;
      // }

      await axios.post("/list/createList", {
        title,
        description,
        selectedMovies,
      });

      setSuccessMessage("List Created Successfully!");
      setTitle("");
      setDescription("");
      setSelectedMovies([]);
    } catch (error) {
      console.error("Error creating list:", error);
      setSuccessMessage("Failed to create list. Please try again.");
    } finally {
      setLoading(false);

      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setSelectedMovies([]);
    setSuccessMessage("");
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovies((prev) => {
      const alreadyExists = prev.some((m) => m.id === movie.id);
      if (alreadyExists) return prev;
      return [...prev, movie];
    });
  };

  const handleRemoveMovie = (id) => {
    setSelectedMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const checkIfListAlreadyExists = async () => {
    try {
      //api call to get list names

      if (userListNames.includes(title)) {
        return true;
      }

      return false;
    } catch (error) {
      console.log("Error getting user list names", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white px-6 py-10 font-bebas-neue">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl mb-4">Create a New List</h1>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-blue-500 text-white text-center py-3 rounded-lg text-lg animate-fade-in">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Title */}
          <input
            type="text"
            placeholder="List Title"
            className="p-4 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            className="p-4 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Search & Movie Selector */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl mb-2">Search & Add Movies</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search Section */}
              <div className="bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col gap-4">
                <ListMovieSearch onSelect={handleSelectMovie} />
              </div>

              {/* Selected Movies */}
              <div className="bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col gap-4">
                <SelectedMoviesPreview
                  selectedMovies={selectedMovies}
                  onRemove={handleRemoveMovie}
                  setSelectedMovies={setSelectedMovies}
                />
              </div>
            </div>
          </div>

          {/* Reset Button Moved Here */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 px-6 rounded-lg text-white text-md"
            >
              Reset List
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } py-4 px-8 rounded-lg text-white text-xl flex items-center gap-2`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create List"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateList;
