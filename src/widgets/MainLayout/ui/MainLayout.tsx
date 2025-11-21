"use client";

import React, { memo, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useLayoutColors } from "../colors/useLayoutColors";
import { getShowGlobalBg } from "../lib/getShowGlobalBg";
import { LayoutErrorBoundary } from "../lib/LayoutErrorBoundary";
import HeaderSpacer from "./HeaderSpacer";
import { HeaderFallback, MainFallback, FooterFallback } from "./Fallbacks";
import Header from "widgets/Header";
import Footer from "widgets/Footer";
import FeedbackWidget from "widgets/FeedbackWidget";
import GlobalBackground from "shared/ui/GlobalBackground";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const showGlobalBg = useMemo(() => getShowGlobalBg(pathname ?? ""), [pathname]);
  const { appBg } = useLayoutColors();

  return (
    <Box bg={appBg} minH="100dvh" position="relative" display="flex" flexDirection="column">
      {showGlobalBg && <GlobalBackground />}

      <React.Suspense fallback={<HeaderFallback />}>
        <Header />
      </React.Suspense>
      <HeaderSpacer />

      <LayoutErrorBoundary>
        <React.Suspense fallback={<MainFallback />}>
          <Box
            as="main"
            id="main-content"
            flex="1 0 auto"
            px={{ base: 4, md: 6 }}
          >
            {children}
          </Box>
        </React.Suspense>
      </LayoutErrorBoundary>

      <React.Suspense fallback={<FooterFallback />}>
        <Footer />
      </React.Suspense>

      <FeedbackWidget />
    </Box>
  );
};

export default memo(MainLayout);



