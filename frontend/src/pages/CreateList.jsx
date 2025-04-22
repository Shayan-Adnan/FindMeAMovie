import { useState } from "react";

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      description,
      selectedMovies,
    });
  };

  const removeMovie = (index) => {
    const updatedMovies = [...selectedMovies];
    updatedMovies.splice(index, 1);
    setSelectedMovies(updatedMovies);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white p-8 font-bebas-neue">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <h1 className="text-4xl mb-4">Create a New List</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <input
            type="text"
            placeholder="List Title"
            className="p-3 rounded bg-zinc-800 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            className="p-3 rounded bg-zinc-800 text-white h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Movie Search Placeholder */}

          {/* Selected Movies */}
          {selectedMovies.length > 0 && (
            <div className="bg-zinc-800 p-4 rounded flex flex-col gap-4">
              <h2 className="text-xl mb-2">Your Selected Movies</h2>
              <div className="flex flex-col gap-3">
                {selectedMovies.map((movie, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-zinc-700 p-3 rounded"
                  >
                    <span>{movie.title}</span>
                    <button
                      type="button"
                      onClick={() => removeMovie(index)}
                      className="text-red-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 w-xs hover:bg-blue-700 p-3 rounded text-white"
            >
              Create List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateList;

// <div className="w-full max-w-md mx-auto">
// <form className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg shadow-lg">
//   <input
//     type="text"
//     placeholder="Search movies..."
//     className="w-full bg-transparent text-white text-lg outline-none placeholder-gray-400"
//   />
//   <button
//     type="submit"
//     className="bg-gradient-to-r from-cyan-400 to-indigo-600 hover:from-cyan-600 hover:to-indigo-600  text-white py-2 px-4 rounded-full transition duration-300"
//   >
//     <img
//       src="magnifying-glass.png"
//       className="w-5 h-5 md:w-6 md:h-6"
//     ></img>
//   </button>
// </form>
// </div>
