import ProfileHeader from "../components/ProfileHeader";
import ListsPreview from "../components/ListsPreview";
import LikedMoviesPreview from "../components/LikedMoviesPreview";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState();
  const [likedMovies, setLikedMovies] = useState([]);
  const [lists, setLists] = useState([]);
  const [likedMoviesData, setLikedMoviesData] = useState([]);
  const userId = window.location.hash.split("/")[2];

  const getUserData = async () => {
    try {
      const response = await axios.get(`/user/getUserProfile/${userId}`);
      const data = response.data;

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setLikedMovies(user.likedMovies);
      setLists(user.lists);
    }
  }, [user]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.post("/movie/getMovies", { likedMovies });

        setLikedMoviesData(response.data.likedMoviesData);
      } catch (error) {
        console.log(error);
      }
    };

    if (likedMovies.length !== 0) {
      getMovies();
    }
  }, [likedMovies]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-950 to-slate-900 text-white px-4 py-8 flex flex-col font-bebas-neue"></div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-8 flex flex-col font-bebas-neue">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <ProfileHeader user={user} />
          {likedMoviesData ? (
            <LikedMoviesPreview
              likedMovies={likedMoviesData}
              userId={user.userId}
            />
          ) : (
            <Spinner />
          )}
          <ListsPreview lists={lists} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
