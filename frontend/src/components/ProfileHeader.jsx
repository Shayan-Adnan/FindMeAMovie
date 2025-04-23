function ProfileHeader({
  user: { name, avatar, numberOfLikedMovies, numberOfLists },
}) {
  return (
    <div className="flex items-start gap-4">
      <img src={avatar} className="rounded-full w-20 h-20" alt="Avatar" />
      <div>
        <h1 className="text-2xl">{name}</h1>
        <div className="mt-2 text-sm text-gray-300 space-x-4">
          <span>{numberOfLikedMovies} Liked Movies</span>
          <span>{numberOfLists} Lists</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
