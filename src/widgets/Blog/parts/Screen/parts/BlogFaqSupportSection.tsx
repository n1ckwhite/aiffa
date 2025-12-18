import React from "react";
import { Box } from "@chakra-ui/react";
import { ModulesFAQ } from "widgets/Modules";

export const BlogFaqSupportSection: React.FC = () => {
  return (
    <Box mt={{ base: 10, md: 14 }}>
      <ModulesFAQ variant="blog" showSupportBlock />
    </Box>
  );
};


