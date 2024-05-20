import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Button,
} from "@chakra-ui/react";
import Details from "./Details";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export const ListView = () => {
  const url = "https://pokeapi.co/api/v2/pokemon";
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";

  const typeUrl = "https://pokeapi.co/api/v2/type";

  const [listViews, setListViews] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPreviousPage, setCanPreviousPage] = useState(false);

  const getPokemonNumber = (url) => {
    const parts = url.split("/");
    const lastNumber = parts[parts.length - 2];
    return lastNumber;
  };

  async function getListViews() {
    try {
      const response = await fetch(
        `${url}?offset=${(pageIndex - 1) * pageSize}&limit=${pageSize}`
      );
      const data = await response.json();
      console.log(data);
      setListViews(data);
      setPageCount(Math.ceil(data.count / pageSize));
      setCanNextPage(data.next !== null);
      setCanPreviousPage(data.previous !== null);
    } catch (error) {
      console.log(error);
    }
  }
  const handlePageChange = (page) => {
    setSelectedPage(page);
    setPageIndex(page);
  };

  async function searchPokemon(query) {
    try {
      const response = await fetch(`${baseUrl}/${query.toLowerCase()}`);
      const data = await response.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setSearchResults(null);
    }
  }

  useEffect(() => {
    if (!searchQuery) {
      getListViews();
    }
  }, [pageIndex, pageSize, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      searchPokemon(query);
    } else {
      getListViews();
    }
  };
  console.log(searchQuery.length);

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 lg:p-20">
        {searchQuery.length > 0 ? (
          searchResults !== null ? (
            <Card className="m-4 ">
              <CardBody>
                <Card className="w-50 h-full ">
                  <Image
                    src={searchResults.sprites.other.dream_world.front_default}
                    alt={searchResults.name}
                    borderRadius="lg"
                    align="center"
                    className="w-full h-full lg:h-50"
                  />
                </Card>
              </CardBody>

              <Heading size="md" className="text-center pb-4 capitalize">
                {searchResults.name}
              </Heading>
              <CardFooter className="text-center absolute bottom-4 right-2  opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  variant="solid"
                  colorScheme=""
                  className="text-center bg-theme-pink py-8 bg-opacity-70 "
                ></Button>
              </CardFooter>
            </Card>
          ) : (
            <>Not Found</>
          )
        ) : (
          listViews !== null &&
          listViews.results.map((item) => (
            <Card className="m-4 ">
              <CardBody>
                <Card className="w-50 h-full ">
                  <Image
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${getPokemonNumber(
                      item.url
                    )}.svg`}
                    alt={item.name}
                    borderRadius="lg"
                    align="center"
                    className="w-full h-full lg:h-50"
                  />
                </Card>
              </CardBody>

              <Heading size="md" className="text-center pb-4 capitalize">
                {item.name}
              </Heading>
              <CardFooter className="text-center absolute bottom-4 right-2  opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  variant="solid"
                  colorScheme=""
                  className="text-center bg-theme-pink py-8 bg-opacity-70 "
                >
                  <Details pokemon={item} />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {!searchQuery && (
        <div className="pb-8">
          <button
            className="bg-pink-600 ml-8 rounded m-4 p-2 md:m-8 md:p-4"
            onClick={() => setPageIndex((prevPageIndex) => prevPageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <ArrowLeftIcon /> Previous
          </button>
          <span>
            Page {pageIndex} of {pageCount}
          </span>
          <button
            className="bg-pink-600 ml-8 rounded m-4 p-2 md:m-8 md:p-4"
            onClick={() => setPageIndex((prevPageIndex) => prevPageIndex + 1)}
            disabled={!canNextPage}
          >
            <ArrowRightIcon /> Next
          </button>
          <div>
            <button
              onClick={() => setSelectedPage((prevPage) => prevPage - 1)}
              disabled={selectedPage === 1}
            >
              {"<"}
            </button>
            <input
              type="number"
              value={selectedPage}
              min={4}
              max={pageCount}
              onChange={(e) => {
                const page = parseInt(e.target.value, 10);
                if (!isNaN(page) && page >= 1 && page <= pageCount) {
                  setSelectedPage(page);
                }
              }}
            />
            <button
              onClick={() => setSelectedPage((prevPage) => prevPage + 1)}
              disabled={selectedPage === pageCount}
            >
              {">"}
            </button>
            <button onClick={() => handlePageChange(selectedPage)}>Go</button>
          </div>
        </div>
      )}
    </>
  );
};
