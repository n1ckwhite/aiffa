"use client";

import React from "react";
import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { UserProfileProvider } from "entities/user";

type ChakraRootProviderProps = {
  children: React.ReactNode;
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({
  config
});

export const ChakraRootProvider = ({ children }: ChakraRootProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <UserProfileProvider>{children}</UserProfileProvider>
    </ChakraProvider>
  );
};


