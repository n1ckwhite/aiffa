import React from 'react';
import { Badge } from '@chakra-ui/react';

export const TagBadge: React.FC<{ tag: string; colorScheme?: string }> = ({ tag, colorScheme }) => {
  return (
    <Badge borderRadius="full" px={2} py={0.5} variant="subtle" colorScheme={colorScheme || 'blue'}>
      {tag}
    </Badge>
  );
};


