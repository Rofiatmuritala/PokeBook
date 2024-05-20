import React, { useState } from "react";

export const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="flex p-2 mx-4 justify-between items-center border-b border-gray-300 flex-wrap">
      <div className="flex items-center">
        <img
          src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/2.svg"
          className="w-70 h-20 pb-"
          alt="PokeBook Logo"
        />
        <h2 className="font-bold text-3xl">
          Poke<span className="font-bold text-3xl text-pink-600">Book</span>
        </h2>
      </div>
      {/* <h2>{searchQuery}</h2> */}
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center md:inline-flex">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-pink-200 rounded-full w-full py-3 px-28"
          />
          <button
            type="submit"
            className="absolute right-2 h-10 w-12 text-pink-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="flex items-center gap-2">
        <button className="border px-4 py-4 rounded-full bg-pink-600 text-white hover:bg-pink-700">
          {/* <ColorTheme /> */}
        </button>
      </div>
    </div>
  );
};
