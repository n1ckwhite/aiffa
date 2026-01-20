"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import FAQ from "widgets/Modules/FAQ/FAQ";

const HomeFaqSection: React.FC = () => {
  return (
    <Box as="section" aria-label="Частые вопросы" px={{ base: 4, md: 6 }} py={{ base: 12, md: 16 }}>
      <FAQ title="Частые вопросы" variant="home" showSupportBlock={false} />
    </Box>
  );
};

export default HomeFaqSection;

