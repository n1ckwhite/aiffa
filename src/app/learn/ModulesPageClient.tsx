"use client";

import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import CourseGrid from "widgets/CourseGrid";
import { ModulesHeader, ModulesSegment, ModulesFAQ } from "widgets/Modules";
import type { ModulesCategory } from "widgets/Modules/Segment/types/ModulesSegment.types";

const ModulesPageClient = () => {
  const [category, setCategory] = useState<ModulesCategory>("base");

  return (
    <Box pb="32px" pt={12} px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <Box maxW="1200px" mx="auto">
        <ModulesHeader />
        <ModulesSegment value={category} onChange={(v) => setCategory(v)} />
      </Box>
      <CourseGrid category={category} showHeader={false} />
      <ModulesFAQ />
    </Box>
  );
};

export default ModulesPageClient;


