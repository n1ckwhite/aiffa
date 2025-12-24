"use client";

import { memo, ReactNode, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useLayoutColors } from "../colors/useLayoutColors";
import { LayoutErrorBoundary } from "../lib/LayoutErrorBoundary";
import HeaderSpacer from "./HeaderSpacer";
import Header from "widgets/Header";
import Footer from "widgets/Footer";
import FeedbackWidget from "widgets/FeedbackWidget";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { appBg, color } = useLayoutColors();

  return (
    <Box
      bg={appBg}
      color={color}
      position="relative"
      display="flex"
      flexDirection="column"
      sx={{
        minHeight: "calc(var(--vh, 1vh) * 100)",
        "@supports (-webkit-touch-callout: none)": {
          minHeight: "-webkit-fill-available",
        },
        "@supports (height: 100dvh)": {
          minHeight: "100dvh",
        },
      }}
    >
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



