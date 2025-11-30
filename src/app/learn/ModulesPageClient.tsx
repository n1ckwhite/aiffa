"use client";

import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import CourseGrid from "widgets/CourseGrid";
import { ModulesHeader, ModulesSegment, ModulesFAQ } from "widgets/Modules";
import type { ModulesCategory } from "widgets/Modules/Segment/types/ModulesSegment.types";
import { StudentIcon } from "@/shared/icons/components-icon";

const ModulesPageClient = () => {
  const [category, setCategory] = useState<ModulesCategory>("base");

  return (
    <Box
      as="main"
      role="main"
      pb="32px"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
      aria-labelledby="learn-modules-title"
    >
      <Box maxW="1200px" mx="auto">
        <Box as="header">
          <ModulesHeader />
        </Box>
        <StudentIcon />
        <ModulesSegment value={category} onChange={(v) => setCategory(v)} />
      </Box>
      <CourseGrid category={category} showHeader={false} />
      <ModulesFAQ />
    </Box>
  );
};

export default ModulesPageClient;


