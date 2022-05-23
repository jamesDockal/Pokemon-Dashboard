import React from "react";

import { Badge, Box, Image, useDisclosure } from "@chakra-ui/react";

const TypeColor: any = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

type Props = {
  pokemon: {
    name: string;
    url: {
      front: string;
      back: string;
    };
    types: string[];
  };
};

export const Card: React.FC<Props> = ({ pokemon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      display={"flex"}
      alignItems="center"
      flexDirection={"column"}
      justifyContent={"center"}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      cursor={"pointer"}
    >
      <Image
        src={isOpen ? pokemon.url.back : pokemon.url.front}
        alt={pokemon.name}
      />

      <Box p="6">
        <Box display="flex" gap={2} justifyContent="center">
          {pokemon.types.map((type) => {
            return (
              <Badge borderRadius="full" px="2" color={TypeColor[type] as any}>
                {type}
              </Badge>
            );
          })}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          display={"flex"}
          alignItems="center"
          flexDirection={"column"}
        >
          {pokemon.name}
        </Box>
      </Box>
    </Box>
  );
};
