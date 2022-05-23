import {
  Badge,
  Box,
  Flex,
  Image,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pokeApi } from "../../services/api";
import { TypeColor } from "../../styles/typeColors";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale
);

type Pokemon = {
  name: string;
  url: {
    front: string;
    back: string;
  };
  types: string[];
  stats: {
    value: number;
    name: string;
  }[];
};

export const PokemonDetail: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    pokeApi.get(`/pokemon/${params.name}`).then(({ data: pokemon }) => {
      setPokemon({
        name: `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`,
        url: {
          front: pokemon.sprites.front_default,
          back: pokemon.sprites.back_default,
        },
        types: pokemon.types.map(
          ({ type }: { type: { name: string } }) => type.name
        ),
        stats: pokemon.stats.map((item: any) => ({
          value: item.base_stat,
          name: item.stat.name,
        })),
      });

      setIsLoading(false);
    });
  }, []);

  let gradient;
  let chartData: any;
  if (pokemon.types?.length) {
    gradient =
      pokemon.types.length === 1
        ? `${TypeColor[pokemon.types[0]]}, ${TypeColor[pokemon.types[0]]}`
        : pokemon.types.map((type) => TypeColor[type]).join(",");

    chartData = {
      labels: pokemon.stats.map(({ name }) =>
        name.replace("-", " ").toUpperCase()
      ),
      datasets: [
        {
          label: "Power",
          data: pokemon.stats.map(({ value }) => value),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          color: "white",
          fill: true,
        },
        {
          label: "Highest",
          data: [255, 181, 230, 150, 230, 200],
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderWidth: 1,
          fill: true,
        },
      ],
    };
  }
  console.log("chartData", chartData);

  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      my={"6"}
      mx={"auto"}
      px="6"
      maxW={380}
      alignItems="center"
      overflowY={"hidden"}
    >
      {isLoading ? (
        <Spinner position={"absolute"} top="50%" left={"50%"} />
      ) : (
        <Flex flexDirection={"column"} w={"100%"}>
          <Image
            src={isOpen ? pokemon.url.back : pokemon.url.front}
            alt={pokemon.name}
            bgGradient={`linear(to-br, ${gradient})`}
            height={200}
            borderRadius={16}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
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
          <Box>
            <Bar
              data={chartData}
              // height={200}
              width={100}
              options={{
                // maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: false,
                  },
                  subtitle: {
                    color: "white",
                  },
                  title: {
                    color: "white",
                  },
                },
              }}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
