import React from 'react';
import { Box } from '@chakra-ui/react';
import SupportBlock from 'widgets/SupportBlock';

export const ProjectSupport: React.FC<{ borderColor: string; cardBg: string }> = ({ borderColor, cardBg }) => {
  return (
    <Box id="project-support-anchor">
      <SupportBlock borderColor={borderColor} containerBg={cardBg} accentScheme="blue" variant="project" />
    </Box>
  );
};


