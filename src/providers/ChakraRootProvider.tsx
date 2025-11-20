"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "shared/theme/chakraTheme";
import { UserProfileProvider } from "entities/user";

type ChakraRootProviderProps = {
  children: React.ReactNode;
};

export const ChakraRootProvider = ({ children }: ChakraRootProviderProps) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={chakraTheme}>
        <UserProfileProvider>{children}</UserProfileProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};


