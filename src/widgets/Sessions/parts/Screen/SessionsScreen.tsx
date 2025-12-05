import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import SessionsHeroSection from "../HeroSection/SessionsHeroSection";
import SessionsFirstSessionSection from "../FirstSessionSection/SessionsFirstSessionSection";
import SessionsFirstSessionDetailsSection from "../FirstSessionDetailsSection/SessionsFirstSessionDetailsSection";
import SessionsForWhomSection from "../ForWhomSection/SessionsForWhomSection";
import SessionsUpcomingScheduleSection from "../UpcomingScheduleSection/SessionsUpcomingScheduleSection";
import SessionsFormatsSection from "../FormatsSection/SessionsFormatsSection";
import SessionsFinalCtaSection from "../FinalCtaSection/SessionsFinalCtaSection";
import SessionsFaqSection from "../FaqSection/SessionsFaqSection";

const SessionsScreen: React.FC = () => {
  return (
    <Box
      as="main"
      role="main"
      aria-label="Сессии AIFFA"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
    >
      <Box maxW="1200px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          <SessionsHeroSection />
          <SessionsFirstSessionSection />
          <SessionsFirstSessionDetailsSection />
          <SessionsForWhomSection />
          <SessionsUpcomingScheduleSection />
          <SessionsFormatsSection />
          <SessionsFinalCtaSection />
          <SessionsFaqSection />
        </VStack>
      </Box>
    </Box>
  );
};

export default SessionsScreen;

