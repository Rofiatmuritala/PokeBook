import React from "react";
import { Link } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";

export const HomeView = () => {
  return (
    <>
      <div class="bg-gray-100 dark:bg-gray-800 items-center justify=center object-center">
        <div class="min-h-screen flex items-center justify-center">
          <div class="ml- justify-center items-center">
            <img
              className="w-[40%] ml-32"
              src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/160.svg"
              alt="logo"
              srcset=""
            />{" "}
            <div className="text-5xl text-center py-2 font-bold">
              <h1>
                Poke<span className="text-pink-600">Book</span>
              </h1>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 text-center mb-12">
              Largest Pokemon index with information about <br />
              every Pokemon you can think of.
            </p>
            <form
              action="/listviews"
              class="flex flex-col md:flex-row justify-center items-center gap-4 "
            >
              <div className="relative flex items-center md:inline-flex w-3/4  md:w-full">
                <input
                  class="w-3/4  md:w-full md:w-80  py-4 px-4 border
                rounded-full text-gray-800 dark:text-white border-pink-600
                border-8 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                  type="search"
                  placeholder="Enter pokemon name"
                />
                <button
                  type="submit"
                  className="absolute right-2 h-40 w-12  text-pink-400 hover:text-pink-500"
                >
                  <Search2Icon size="lg" className="w-full h-full" />
                </button>
              </div>
            </form>
            <div className="text-center py-2 text-sm underline">
              <Link to={"/listviews"} className="">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
