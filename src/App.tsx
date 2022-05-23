import * as React from "react";

import { ChakraProvider, theme } from "@chakra-ui/react";
import { PageRoutes } from "./routes";

import { Home } from "./pages/Home";

export const App = () => {
  return (
    <ChakraProvider>
      <PageRoutes />
    </ChakraProvider>
  );
};
