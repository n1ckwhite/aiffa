import React from 'react';
import { HStack, Text, Icon } from '@chakra-ui/react';
import { FaSeedling, FaCrown } from 'react-icons/fa6';
import type { WeeklyTasksTierBadgeProps } from '../../types';
import { useTierBadgeColors } from '../../colors/useTierBadgeColors';

const Root: React.FC<WeeklyTasksTierBadgeProps> = ({ label }) => {
  const { beginnerBg, advancedBg, mediumBorder, mediumText } = useTierBadgeColors();
  if (label === 'Начальный') {
    return (
      <HStack borderRadius="full" px={4} py={1.5} bg={beginnerBg} color="white" spacing={2} fontWeight="bold">
        <Icon as={FaSeedling as unknown as React.ElementType} />
        <Text>{label.toUpperCase()}</Text>
      </HStack>
    );
  }
  if (label === 'Продвинутый') {
    return (
      <HStack borderRadius="full" px={4} py={1.5} bg={advancedBg} color="white" spacing={2} fontWeight="bold">
        <Icon as={FaCrown as unknown as React.ElementType} />
        <Text>{label.toUpperCase()}</Text>
      </HStack>
    );
  }
  return (
    <HStack
      borderRadius="full"
      px={4}
      py={1.5}
      borderWidth="2px"
      borderColor={mediumBorder}
      color={mediumText}
      spacing={2}
      fontWeight="bold"
      bg="transparent"
    >
      <Icon viewBox="0 0 512 512" focusable="false">
        <path d="M256 32c12.5 0 24.1 6.4 30.8 17L503.4 394.4c5.6 8.9 8.6 19.2 8.6 29.7c0 30.9-25 55.9-55.9 55.9L55.9 480C25 480 0 455 0 424.1c0-10.5 3-20.8 8.6-29.7L225.2 49c6.6-10.6 18.3-17 30.8-17zm65 192L256 120.4 176.9 246.5l18.3 24.4c6.4 8.5 19.2 8.5 25.6 0l25.6-34.1c6-8.1 15.5-12.8 25.6-12.8l49 0z" fill="currentColor" />
      </Icon>
      <Text>{label.toUpperCase()}</Text>
    </HStack>
  );
};

export default Root;


