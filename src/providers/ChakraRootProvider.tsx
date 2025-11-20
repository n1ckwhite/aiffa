"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  ColorModeScript,
  localStorageManager
} from "@chakra-ui/react";
import theme from "shared/theme/theme";
import { UserProfileProvider } from "entities/user";

type ChakraRootProviderProps = {
  children: React.ReactNode;
};

export const ChakraRootProvider = ({ children }: ChakraRootProviderProps) => {
  return (
    <CacheProvider>
      <ChakraProvider
        theme={theme}
        cssVarsRoot="body"
        colorModeManager={localStorageManager}
      >
        <ColorModeScript
          initialColorMode={theme.config.initialColorMode}
        />
        <UserProfileProvider>{children}</UserProfileProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};


