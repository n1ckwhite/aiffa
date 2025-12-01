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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AIFFA — платформа для роста разработчиков",
    template: "%s — AIFFA"
  },
  description:
    "AIFFA — практическая платформа для разработчиков: задачи, материалы и проекты по JavaScript, фронтенду и смежным направлениям.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AIFFA",
    title: "AIFFA — платформа для роста разработчиков",
    description:
      "Практические задачи, материалы и проекты для фронтенд‑разработчиков и JavaScript‑инженеров.",
    locale: "ru_RU"
  },
  twitter: {
    card: "summary_large_image",
    title: "AIFFA — платформа для роста разработчиков",
    description:
      "Практическая платформа для развития навыков JavaScript и фронтенда.",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ]
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: SITE_URL,
              name: "AIFFA — платформа для роста разработчиков",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: SITE_URL,
              name: "AIFFA",
              logo: `${SITE_URL}/logo512.png`
            })
          }}
        />
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


