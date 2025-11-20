"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, localStorageManager } from "@chakra-ui/react";
import { chakraTheme } from "shared/theme/chakraTheme";
import { UserProfileProvider } from "entities/user";

type ChakraRootProviderProps = {
  children: React.ReactNode;
};

// Менеджер цветовой темы без сохранения между перезагрузками:
// внутри сессии тема переключается, но при reload всегда стартуем со светлой
const noPersistColorModeManager = {
  ...localStorageManager,
  get: (initialColorMode?: "light" | "dark" | "system") => {
    if (initialColorMode === "dark") {
      return "dark";
    }
    return "light";
  },
  set: () => {
    return;
  }
};

export const ChakraRootProvider = ({ children }: ChakraRootProviderProps) => {
  return (
    <CacheProvider>
      <ChakraProvider
        theme={chakraTheme}
        cssVarsRoot="body"
        colorModeManager={noPersistColorModeManager}
      >
        <UserProfileProvider>{children}</UserProfileProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};


