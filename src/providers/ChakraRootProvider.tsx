"use client";

import React from "react";
import { useEmotionCache } from "@chakra-ui/next-js/use-emotion-cache";
import {
  ChakraProvider,
  cookieStorageManager,
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

  // Важно: для SSR используем cookieStorageManagerSSR (первый рендер совпадает и не даёт hydration mismatch),
  // а после маунта переключаемся на cookieStorageManager, чтобы на клиенте работало чтение/запись куки.
  const [colorModeManager, setColorModeManager] = React.useState(() =>
    cookieStorageManagerSSR(cookies ?? "")
  );

  React.useEffect(() => {
    setColorModeManager(cookieStorageManager);
  }, []);

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


