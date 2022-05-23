import React, { forwardRef } from "react";

import { Badge, Box, Image, useDisclosure } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { TypeColor } from "../../styles/typeColors";

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

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ pokemon }: Props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const gradient =
      pokemon.types.length === 1
        ? `${TypeColor[pokemon.types[0]]}, ${TypeColor[pokemon.types[0]]}`
        : pokemon.types.map((type) => TypeColor[type]).join(",");

    const navigate = useNavigate();

    const handleClick = () => {
      return navigate(`/pokemon/${pokemon.name.toLowerCase()}`);
    };

    return (
      <Box
        onClick={handleClick}
        ref={ref}
        borderWidth="1px"
        borderRadius="lg"
        display={"flex"}
        alignItems="center"
        pt={3}
        flexDirection={"column"}
        justifyContent={"center"}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        cursor={"pointer"}
      >
        <Image
          src={isOpen ? pokemon.url.back : pokemon.url.front}
          alt={pokemon.name}
          bgGradient={`linear(to-br, ${gradient})`}
          borderRadius={16}
        />

        <Box p="6">
          <Box display="flex" gap={2} justifyContent="center">
            {pokemon.types.map((type) => {
              return (
                <Badge
                  borderRadius="full"
                  px="2"
                  color={TypeColor[type] as any}
                >
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
  }
);
