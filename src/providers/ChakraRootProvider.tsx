"use client";

import React from "react";
import { useEmotionCache } from "@chakra-ui/next-js/use-emotion-cache";
import {
  ChakraProvider,
  cookieStorageManagerSSR,
} from "@chakra-ui/react";
import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
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
  const emotionCache = useEmotionCache();

  // Важно: используем один и тот же менеджер и на сервере, и на клиенте (первый рендер),
  // иначе возможны hydration mismatch в React 19 из-за различий в вычислении color mode.
  const colorModeManager = cookieStorageManagerSSR(cookies ?? "");

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
    <EmotionCacheProvider value={emotionCache}>
      <ChakraProvider
        theme={theme}
        cssVarsRoot="body"
        colorModeManager={colorModeManager}
      >
        <UserProfileProvider initialProfile={initialProfile}>
          {children}
        </UserProfileProvider>
      </ChakraProvider>
    </EmotionCacheProvider>
  );
};


