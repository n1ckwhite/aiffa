"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  cookieStorageManager,
  cookieStorageManagerSSR,
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
  const colorModeManager =
    typeof document === "undefined"
      ? cookieStorageManagerSSR(cookies ?? "")
      : cookieStorageManager;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch {
        // silent fail – PWA не критична для основного функционала
      }
    };

    register();
  }, []);

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


