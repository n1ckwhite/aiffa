import type { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/shared/theme/theme";
import { ChakraRootProvider } from "../providers/ChakraRootProvider";
import MainLayout from "@/widgets/MainLayout";

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

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </head>
      <body>
        <ChakraRootProvider cookies={cookieString}>
          <MainLayout>{children}</MainLayout>
        </ChakraRootProvider>
      </body>
    </html>
  );
};

export default RootLayout;


