import React from 'react';
import { Box, HStack, Link, Text } from '@chakra-ui/react';
import type { ResourcesProps } from './types';

export const Resources: React.FC<ResourcesProps> = ({ resources, descColor, linkColor }) => {
  if (!Array.isArray(resources) || resources.length === 0) return null;
  return (
    <Box mt={3}>
      <Text fontSize="xs" color={descColor} mb={1}>Полезные материалы</Text>
      <HStack spacing={3} wrap="wrap">
        {resources.map((r, i) => (
          <Link key={i} href={r.href} isExternal color={linkColor} fontSize="sm">
            {r.label || r.href}
          </Link>
        ))}
      </HStack>
    </Box>
  );
};


