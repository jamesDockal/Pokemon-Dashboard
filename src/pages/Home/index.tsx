import { Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { pokeApi } from "../../services/api";

export const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<any>([]);
  const [count, setCount] = useState(100);

  useEffect(() => {
    Array(count)
      .fill("")
      .forEach((_, index) => {
        pokeApi.get(`/pokemon/${index + 1}`).then(({ data: pokemon }) => {
          setPokemons((oldState: any) => [
            ...oldState,
            {
              name: `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`,
              url: {
                front: pokemon.sprites.front_default,
                back: pokemon.sprites.back_default,
              },
              types: pokemon.types.map(
                ({ type }: { type: { name: string } }) => type.name
              ),
            },
          ]);
        });
      });
  }, []);

  return (
    <Flex w={"100%"} my={"6"} mx={"auto"} px="6">
      <SimpleGrid
        flex={"1"}
        gap={"4"}
        minChildWidth={"320px"}
        justifyContent="center"
      >
        {pokemons?.map((pokemon: any) => (
          <Card pokemon={pokemon} key={pokemon.name} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
