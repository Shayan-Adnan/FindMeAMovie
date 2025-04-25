import { Link } from "react-router-dom";

function ProfileHeader({
  user: { userId, name, avatar, numberOfLikedMovies, numberOfLists },
}) {
  return (
    <div className="flex items-start gap-4">
      <Link to={`/profile/${userId}`}>
        <img src={avatar} className="rounded-full w-20 h-20" alt="Avatar" />
      </Link>
      <div>
        <Link to={`/profile/${userId}`}>
          <h1 className="text-2xl">{name}</h1>
        </Link>
        <div className="mt-2 text-sm text-gray-300 space-x-4">
          <span>{numberOfLikedMovies} Liked Movies</span>
          <span>{numberOfLists} Lists</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
