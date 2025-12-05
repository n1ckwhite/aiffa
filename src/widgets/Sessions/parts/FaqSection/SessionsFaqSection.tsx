"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import FAQ from "widgets/Modules/FAQ/FAQ";

const SessionsFaqSection: React.FC = () => {
  return (
    <Box
      as="section"
      aria-label="Частые вопросы о сессиях и мероприятиях"
      pt={{ base: 4, md: 6 }}
      zIndex={100}
    >
      <FAQ
        title="Частые вопросы о сессиях и мероприятиях"
        variant="sessions"
        showSupportBlock={false}
      />
    </Box>
  );
};

export default SessionsFaqSection;


