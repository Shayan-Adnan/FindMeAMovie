import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListsPreview = ({ lists = [] }) => {
  const navigate = useNavigate();
  const loadFullList = (id) => {
    console.log(id);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl md:text-2xl mb-4">Lists</h2>
      <div className="border-b border-zinc-500 mb-4"></div>
      {lists.map((list, i) => (
        <div key={i} className="mb-8 border-b border-zinc-700 pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex gap-1">
              {list.movies.slice(0, 4).map((movie, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="poster"
                  className="w-20 h-[110px] object-cover rounded-sm border border-zinc-700 cursor-pointer"
                  onClick={() => loadFullList(list._id)}
                />
              ))}
            </div>

            {/* Section Of Info*/}
            <div className="flex flex-col justify-center">
              <h3 className=" text-white text-base sm:text-lg md:text-xl hover:text-green-500 transition duration-300 cursor-pointer">
                <button onClick={() => loadFullList(list._id)}>
                  {list.title}
                </button>
              </h3>

              {list.description && (
                <p className="text-sm sm:text-base text-zinc-400 mt-1 whitespace-pre-line">
                  {list.description}
                </p>
              )}
              <div className="text-sm sm:text-base text-zinc-400 mt-2 space-x-4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListsPreview;
