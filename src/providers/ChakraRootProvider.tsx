"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  cookieStorageManagerSSR
} from "@chakra-ui/react";
import theme from "shared/theme/theme";
import { UserProfileProvider } from "entities/user";
import type { UserProfile } from "entities/user/model/types";

type ChakraRootProviderProps = {
  children: React.ReactNode;
  cookies: string;
  initialProfile: UserProfile;
};

export const ChakraRootProvider = ({
  children,
  cookies,
  initialProfile
}: ChakraRootProviderProps) => {
  const colorModeManager = cookieStorageManagerSSR(cookies ?? "");

  return (
    <CacheProvider>
      <ChakraProvider
        theme={theme}
        cssVarsRoot="body"
        colorModeManager={colorModeManager}
      >
        <UserProfileProvider initialProfile={initialProfile}>
          {children}
        </UserProfileProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};


