"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import CourseGrid from "widgets/CourseGrid";
import { ModulesHeader, ModulesFAQ, ModulesRoadmapCta } from "widgets/Modules";

const ModulesPageClient = () => {
  return (
    <Box
      as="main"
      role="main"
      pb="32px"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
      aria-labelledby="learn-modules-title"
    >
      <Box as="header">
        <ModulesHeader />
      </Box>

      <Box mt={{ base: 6, md: 8 }} mb={{ base: 10, md: 12 }}>
        <ModulesRoadmapCta />
      </Box>

      <CourseGrid category="all" showHeader={false} />
      <ModulesFAQ />
    </Box>
  );
};

export default ModulesPageClient;


