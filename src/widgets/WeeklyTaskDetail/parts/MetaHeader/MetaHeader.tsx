import React from 'react';
import { Box, HStack, Badge, Icon, Heading, Text } from '@chakra-ui/react';
import { FaCircleCheck } from 'react-icons/fa6';
import { useMetaHeaderColors } from '../../colors/useMetaHeaderColors';
import { MetaHeaderProps } from './types';

const MetaHeader: React.FC<MetaHeaderProps> = ({ tag, icon, color, title, description, done }) => {
  const { doneColor } = useMetaHeaderColors();
  return (
    <Box>
      <HStack spacing={3} mb={2} align="center" flexWrap="wrap">
        <Badge colorScheme={color as any} borderRadius="full" px={2} py={0.5} display="inline-flex" alignItems="center" gap={1}>
          <Icon as={icon} /> {tag}
        </Badge>
        {done && (
          <HStack spacing={2} color={doneColor}>
            <Icon as={FaCircleCheck as unknown as React.ElementType} />
            <Text fontWeight="semibold">Выполнено</Text>
          </HStack>
        )}
      </HStack>
      <Heading size="lg" mb={3}>{title}</Heading>
      {description && description.length > 0 && (
        <Text fontSize="md" color="text.muted" mb={4}>{description}</Text>
      )}
    </Box>
  );
};

export default MetaHeader;


