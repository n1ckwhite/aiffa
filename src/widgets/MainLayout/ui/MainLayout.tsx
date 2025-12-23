"use client";

import { memo, ReactNode, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useLayoutColors } from "../colors/useLayoutColors";
import { getShowGlobalBg } from "../lib/getShowGlobalBg";
import { LayoutErrorBoundary } from "../lib/LayoutErrorBoundary";
import HeaderSpacer from "./HeaderSpacer";
import Header from "widgets/Header";
import Footer from "widgets/Footer";
import FeedbackWidget from "widgets/FeedbackWidget";
import GlobalBackground from "shared/ui/GlobalBackground";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const showGlobalBg = useMemo(() => getShowGlobalBg(pathname ?? ""), [pathname]);
  const { appBg, color } = useLayoutColors();

  return (
    <Box
      bg={appBg}
      color={color}
      position="relative"
      display="flex"
      flexDirection="column"
      sx={{
        // Use a safe fallback without `vh` (mobile browser bars),
        // then upgrade to dvh when supported.
        minHeight: "100%",
        "@supports (-webkit-touch-callout: none)": {
          minHeight: "-webkit-fill-available",
        },
        "@supports (height: 100dvh)": {
          minHeight: "100dvh",
        },
      }}
    >
      {showGlobalBg && <GlobalBackground />}

      <Header />
      <HeaderSpacer />

      <LayoutErrorBoundary>
        <Box as="main" id="main-content" flex="1 0 auto">
          {children}
        </Box>
      </LayoutErrorBoundary>

      <Footer />

      <FeedbackWidget />
    </Box>
  );
};

export default memo(MainLayout);



