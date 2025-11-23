import type { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/shared/theme/theme";
import { ChakraRootProvider } from "../providers/ChakraRootProvider";
import MainLayout from "@/widgets/MainLayout";
import { PROFILE_COOKIE_KEY, DEFAULT_PROFILE } from "@/entities/user/model/constants";
import type { UserProfile } from "@/entities/user/model/types";
import { sanitizeProfileFromUnknown } from "@/entities/user/model/storage";

export const metadata: Metadata = {
  title: {
    default: "Universe — платформа для роста разработчиков",
    template: "%s — Universe"
  },
  description:
    "Universe — практическая платформа для разработчиков: задачи, материалы и проекты по JavaScript, фронтенду и смежным направлениям."
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const cookieStore = cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  let initialProfile: UserProfile = DEFAULT_PROFILE;
  const profileCookie = cookieStore.get(PROFILE_COOKIE_KEY)?.value;
  if (profileCookie) {
    try {
      const decoded = decodeURIComponent(profileCookie);
      const parsed = JSON.parse(decoded);
      initialProfile = sanitizeProfileFromUnknown(parsed);
    } catch {
      initialProfile = DEFAULT_PROFILE;
    }
  }

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </head>
      <body>
        <ChakraRootProvider cookies={cookieString} initialProfile={initialProfile}>
          <MainLayout>{children}</MainLayout>
        </ChakraRootProvider>
      </body>
    </html>
  );
};

export default RootLayout;


