import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);

  const loadRandomMovie = async () => {
    setTryAgain(false);
    setLoading(true);
    try {
      const response = await axios.get(`/movie/getRandomMovie`);
      const id = response.data.movie.id;
      console.log("id received: ", id);
      navigate(`/movie/${id}`);
    } catch (error) {
      console.error("Failed to get random movie:", error);
      setLoading(false);
      setTryAgain(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white px-6 py-12 font-bebas-neue space-y-12">
        {/* <SearchBar></SearchBar> */}
        <h1 className="text-5xl md:text-7xl text-center leading-tight">
          Find Movies <br /> Without The Hassle
        </h1>

        <Link to="/options">
          <button className="text-slate-900 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-600 px-8 py-4 text-2xl md:text-3xl hover:from-cyan-300 hover:to-indigo-400 transition shadow-lg">
            Find Me A Movie
          </button>
        </Link>

        <button
          className="mt-6 text-lg md:text-xl text-white bg-gray-800 px-6 py-3 rounded-full hover:bg-gray-700 transition shadow-md flex items-center gap-3"
          onClick={loadRandomMovie}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner />
            </>
          ) : tryAgain ? (
            "Try Again"
          ) : (
            "I'm Feeling Lucky"
          )}
        </button>
      </div>
    </>
  );
};

export default Home;
