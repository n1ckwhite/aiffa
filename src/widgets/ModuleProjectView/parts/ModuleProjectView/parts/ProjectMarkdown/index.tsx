import React from 'react';
import { Box } from '@chakra-ui/react';
import MarkdownRenderer from 'shared/ui/MarkdownRenderer';

export const ProjectMarkdown: React.FC<{ md: string }> = ({ md }) => {
  return (
    <Box>
      <MarkdownRenderer content={md} />
    </Box>
  );
};


