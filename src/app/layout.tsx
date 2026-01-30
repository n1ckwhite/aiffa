import type { Metadata, Viewport } from "next";
import React from "react";
import { cookies, headers } from "next/headers";
import { ChakraRootProvider } from "@/providers/ChakraRootProvider";
import MainLayout from "@/widgets/MainLayout";
import { ViewportHeightFix } from "@/shared/ui/ViewportHeightFix/ViewportHeightFix";
import { interFont } from "@/shared/fonts/inter";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AIFFA — материалы для собеседований по фронтенду",
    template: "%s — AIFFA"
  },
  description:
    "AIFFA — материалы по фронтенду для подготовки к собеседованиям: ключевые темы, краткие конспекты и удобная структура.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AIFFA",
    title: "AIFFA — материалы для собеседований по фронтенду",
    description:
      "Ключевые темы и краткие конспекты по фронтенду для подготовки к интервью.",
    locale: "ru_RU"
  },
  twitter: {
    card: "summary_large_image",
    title: "AIFFA — материалы для собеседований по фронтенду",
    description:
      "Материалы по фронтенду для подготовки к собеседованиям.",
  },
  icons: {
    icon: "/icons/icon.svg",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") ?? "";
  const cookieStore = await cookies();

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${interFont.variable} ${interFont.className}`}>
        <ChakraRootProvider cookies={cookieHeader}>
          <ViewportHeightFix />
          <MainLayout>{children}</MainLayout>
        </ChakraRootProvider>
      </body>
    </html>
  );
};

export default RootLayout;


