import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Divider,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import Details from "./Details";

export const Similar = ({ types }) => {
  console.log(types[0].type.name);

  const [similarPokemonType1, setSimilarPokemonType1] = useState(null);
  const typeUrl = `https://pokeapi.co/api/v2/type/${types[0].type.name}`;
  const [pokemonType, setPokemonType] = useState({});
  console.log(typeUrl);

  const getPokemonNumber = (url) => {
    const parts = url.split("/");
    const lastNumber = parts[parts.length - 2];
    return lastNumber;
  };

  async function PokemonType() {
    try {
      const response = await fetch(typeUrl);
      const data = await response.json();
      console.log(data.pokemon[0]);
      setSimilarPokemonType1(data.pokemon);
      console.log(similarPokemonType1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    PokemonType();
  }, [types]);

  return (
    <>
      <div className=""></div>
      <Heading size="md" className="text-center py-2 capitalize bg-white">
        Similar
      </Heading>
      {/* {similarPokemonType1 !== null &&
        JSON.stringify(similarPokemonType1.slice(0, 2))} */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 p-2 lg:px-2">
        {similarPokemonType1 !== null &&
          similarPokemonType1.slice(0, 2).map((item) => (
            <Card className="mx-2 ">
              <CardBody>
                <Card className="w-50 h-full bg-green-200 ">
                  <Image
                    src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${getPokemonNumber(
                      item.pokemon.url
                    )}.svg`}
                    alt={item.pokemon.name}
                    borderRadius="lg"
                    align="center"
                    className="w-[70%] h-full lg:h-50"
                  />
                </Card>
              </CardBody>
              <Heading size="md" className="text-center pb-1 capitalize">
                {item.pokemon.name}
              </Heading>

              <CardFooter className="text-center absolute bottom-4 right-2  opacity-0 hover:opacity-100 transition-opacity"></CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};
