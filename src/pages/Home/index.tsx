import React, { useCallback, useEffect, useRef, useState } from "react";

import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { pokeApi } from "../../services/api";

import { Spinner } from "@chakra-ui/react";

type Pokemon = {
  name: string;
  url: {
    front: string;
    back: string;
  };
  types: string[];
};

export const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState({
    before: 0,
    after: 30,
  });
  const [isLoading, setIsLoading] = useState(true);

  const observer = useRef<any>();

  const lastCardRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCount((prevPageNumber) => ({
            before: prevPageNumber.after,
            after: prevPageNumber.after + 30,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
      .map((_, i) => i + from + 1)
      .filter((page) => page > 0);
  }

  async function searchPokemons() {
    const countArray = generatePagesArray(count.before, count.after);
    setIsLoading(true);

    const newPokemons = (await Promise.all(
      countArray.map(async (value) => {
        const { data: pokemon } = await pokeApi.get(`/pokemon/${value}`);
        return {
          name: `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`,
          url: {
            front: pokemon.sprites.front_default,
            back: pokemon.sprites.back_default,
          },
          types: pokemon.types.map(
            ({ type }: { type: { name: string } }) => type.name
          ),
        };
      })
    )) as any;

    setPokemons((oldState) => {
      if (oldState.length) {
        return [...oldState, ...newPokemons];
      } else {
        return newPokemons;
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    searchPokemons();
  }, [count.after]);

  return (
    <Flex w={"100%"} h={"100vh"} my={"6"} mx={"auto"} px="6">
      <SimpleGrid
        flex={"1"}
        gap={"4"}
        minChildWidth={"320px"}
        justifyContent="center"
      >
        {pokemons?.map((pokemon, index) => {
          if (pokemons.length === index + 1) {
            return (
              <Card ref={lastCardRef} pokemon={pokemon} key={pokemon.name} />
            );
          } else {
            return <Card pokemon={pokemon} key={pokemon.name} />;
          }
        })}

        {isLoading && <Spinner position={"absolute"} top="50%" left={"50%"} />}
      </SimpleGrid>
    </Flex>
  );
};
