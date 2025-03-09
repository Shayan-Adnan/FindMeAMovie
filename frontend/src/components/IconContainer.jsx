import React from "react";

const IconContainer = ({ index, provider }) => {
  return (
    <div key={index} className="relative group ">
      {/* Provider Icon */}
      <img
        src={`providerLogos/${provider}.png`}
        alt={`${provider}`}
        className="w-20 h-20 object-contain rounded-3xl shadow-md bg-gradient-to-r from-indigo-300 to-cyan-400 p-2 
     hover:scale-110 transition-transform"
      />
      {/* Tooltip (Provider Name) */}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 
     bg-slate-900 text-white text-sm px-2 py-1 rounded-md shadow-md opacity-0
     group-hover:opacity-100 transition-opacity"
      >
        {provider}
      </span>
    </div>
  );
};

export default IconContainer;
