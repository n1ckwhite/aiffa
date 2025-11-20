"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  cookieStorageManagerSSR
} from "@chakra-ui/react";
import theme from "shared/theme/theme";
import { UserProfileProvider } from "entities/user";

type ChakraRootProviderProps = {
  children: React.ReactNode;
  cookies: string;
};

export const ChakraRootProvider = ({
  children,
  cookies
}: ChakraRootProviderProps) => {
  const colorModeManager = cookieStorageManagerSSR(cookies ?? "");

  return (
    <CacheProvider>
      <ChakraProvider
        theme={theme}
        cssVarsRoot="body"
        colorModeManager={colorModeManager}
      >
        <UserProfileProvider>{children}</UserProfileProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};


