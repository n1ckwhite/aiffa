import React from 'react';
import { Box, HStack, Icon, Heading, Text } from '@chakra-ui/react';
import { FaCircleCheck } from 'react-icons/fa6';
import { useMetaHeaderColors } from '../../colors/useMetaHeaderColors';
import { MetaHeaderProps } from './types';
import PillBadge from 'shared/ui/PillBadge';

const MetaHeader: React.FC<MetaHeaderProps> = ({ tag, icon, color, title, description, done }) => {
  const { doneColor } = useMetaHeaderColors();
  return (
    <Box>
      <HStack spacing={3} mb={2} align="center" flexWrap="wrap">
        <PillBadge colorScheme={color as any} variant="outline">
          <HStack spacing={1} align="center">
            <Icon as={icon} />
            <Text as="span">{tag}</Text>
          </HStack>
        </PillBadge>
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


