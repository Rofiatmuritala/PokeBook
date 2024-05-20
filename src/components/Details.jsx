import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
  Progress,
} from "@chakra-ui/react";
import { Similar } from "./Similar";

function Details({ pokemon }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const getPokemonNumber = (url) => {
    const parts = url.split("/");
    const lastNumber = parts[parts.length - 2];
    return lastNumber;
  };

  async function fetchPokemonDetails() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      console.log(data);
      setPokemonDetails(data);
      // console.log(data.types);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  }

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemon]);

  return (
    <>
      <Button colorScheme="theme-pink" colorClass="theme-blue" onClick={onOpen}>
        View Pokemon
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Pokemon Details</DrawerHeader> */}
          <DrawerBody>
            <Card className="m-4 ">
              <CardBody>
                <Card className="w-full h-full bg-green-200 ">
                  <Image
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${getPokemonNumber(
                      pokemon.url
                    )}.svg`}
                    alt={pokemon.name}
                    borderRadius="lg"
                    align="center"
                    className="w-[40%] h-full lg:h-50 ml-44"
                  />
                </Card>
              </CardBody>

              <Heading size="md" className="text-center pb-4 capitalize">
                {pokemon.name}
              </Heading>
              {pokemonDetails !== null && (
                <div className="flex justify-center items-center mb-5">
                  {pokemonDetails.types.map((type) => (
                    <div
                      key={type.slot}
                      className="bg-gray-100 mx-2 rounded-xl px-5 py-1"
                    >
                      {type.type.name}
                    </div>
                  ))}
                </div>
              )}

              <CardFooter className="text-center absolute bottom-4 right-2  opacity-0 hover:opacity-100 transition-opacity"></CardFooter>
            </Card>
            {/* {pokemonDetail && (
              <About
                name={pokemonDetail.name}
                height={pokemonDetail.height}
                weight={pokemonDetail.weight}
                // Add more details as needed
              />
            )} */}
            <div>
              <Tabs isManual variant="enclosed">
                <TabPanels>
                  <TabPanel>
                    <p>
                      <div className="">
                        <Heading
                          size="md"
                          className="text-center pb-4 capitalize bg-white"
                        >
                          About
                        </Heading>
                        <Card className="w-50 h-full mx-4">
                          <CardBody className="bg-gray-100">
                            <Heading
                              size="md"
                              className="text-center pb-4 justify-center flex capitalize"
                            >
                              height: {pokemonDetails?.height}
                            </Heading>
                            <Heading
                              size="md"
                              className="text-center pb-4 capitalize"
                            >
                              weight: {pokemonDetails?.weight}
                            </Heading>
                            <Heading
                              size="md"
                              className="text-center pb-4 capitalize"
                            >
                              {" "}
                              abilities:
                              {pokemonDetails?.abilities.map((ability) => (
                                <p className="flex justify-center">
                                  {" "}
                                  {ability.ability.name}
                                </p>
                              ))}
                            </Heading>
                          </CardBody>
                        </Card>
                      </div>
                    </p>
                  </TabPanel>
                  <TabPanel>
                    <p
                      flex
                      flex-cols
                      className="p mb-2 justify-center"
                      style={{ marginRight: "10px" }}
                    >
                      {pokemonDetails?.stats.map((stat, index) => (
                        <div key={index}>
                          <p className="flex mb-2 justify-end mr-50 capitalize">
                            {stat.stat.name}:
                            <Progress
                              className="ml-8 w-1/2 flex mr-2 mt-4 "
                              colorScheme="green"
                              size="xs"
                              value={stat.base_stat}
                            />
                            <p className="ml-7">{stat.base_stat}</p>
                          </p>
                        </div>
                      ))}
                      {/* <Stats /> */}
                    </p>
                  </TabPanel>
                  <TabPanel>
                    {pokemonDetails?.types !== null && (
                      <Similar types={pokemonDetails?.types} />
                    )}
                  </TabPanel>
                </TabPanels>
                <TabList>
                  <Tab>About</Tab>
                  <Tab>Stats</Tab>
                  <Tab>Similar</Tab>
                </TabList>
              </Tabs>
            </div>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Details;
