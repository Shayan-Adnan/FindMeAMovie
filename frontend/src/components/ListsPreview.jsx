import React from "react";

const lists = [
  {
    title: "Liked Movies",
    description: "Hello This is James Bond",
    thumbnails: [
      "/ace.jpg",
      "/kraven.jpg",
      "/amateur.jpg",
      "/bee.jpg",
      "/blackbag.jpg",
    ],
  },
  {
    title: "Recent Activity",
    description: "Hello This is Mike Wilson",

    thumbnails: [
      "/kraven.jpg",
      "/balled.jpg",
      "/atlanta.jpg",
      "/kungfupanda.jpg",
      "/strozek.jpg",
    ],
  },
  {
    title: "Bla bla bla bla bla",
    description: "Hello This is Shamim Bhai",
    thumbnails: [
      "/balled.jpg",
      "/blowuptown.jpg",
      "/kungfupanda.jpg",
      "/strozek.jpg",
      "/atlanta.jpg",
    ],
  },
  {
    title: "Bla bla bla bla bla",
    description: "Hello This is Shamim Bhai",
    thumbnails: [
      "/balled.jpg",
      "/blowuptown.jpg",
      "/kungfupanda.jpg",
      "/strozek.jpg",
      "/atlanta.jpg",
    ],
  },
  {
    title: "Bla bla bla bla bla",
    description: "Hello This is Shamim Bhai",
    thumbnails: [
      "/balled.jpg",
      "/blowuptown.jpg",
      "/kungfupanda.jpg",
      "/strozek.jpg",
      "/atlanta.jpg",
    ],
  },
  {
    title: "Bla bla bla bla bla",
    description: "Hello This is Shamim Bhai",
    thumbnails: [
      "/balled.jpg",
      "/blowuptown.jpg",
      "/kungfupanda.jpg",
      "/strozek.jpg",
      "/atlanta.jpg",
    ],
  },
  {
    title: "Bla bla bla bla bla",
    description: "Hello This is Shamim Bhai",
    thumbnails: [
      "/balled.jpg",
      "/blowuptown.jpg",
      "/kungfupanda.jpg",
      "/strozek.jpg",
      "/atlanta.jpg",
    ],
  },
  {
    title: "Bla bla bla bla bla",
    description: "Hello This is Shamim Bhai",
    thumbnails: [
      "/balled.jpg",
      "/blowuptown.jpg",
      "/kungfupanda.jpg",
      "/strozek.jpg",
      "/atlanta.jpg",
    ],
  },
];

const ListsPreview = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl md:text-2xl mb-4">Lists</h2>
      <div className="border-b border-zinc-500 mb-4"></div>
      {lists.map((list, i) => (
        <div key={i} className="mb-8 border-b border-zinc-700 pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex gap-1">
              {list.thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt=""
                  className="w-20 h-[110px] object-cover rounded-sm border border-zinc-700 cursor-pointer"
                />
              ))}
            </div>

            {/* Section Of Info*/}
            <div className="flex flex-col justify-center">
              <h3 className=" text-white text-base sm:text-lg md:text-xl hover:text-green-500 transition duration-300 cursor-pointer">
                {list.title}
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
