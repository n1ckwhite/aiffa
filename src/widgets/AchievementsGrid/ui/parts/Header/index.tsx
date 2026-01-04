import React from 'react';
import { HStack, Heading, Icon, Text } from '@chakra-ui/react';
import { FaCircleInfo } from 'react-icons/fa6';
import { useAchievementsGridColors } from '../../../colors';

const FaCircleInfoElement = FaCircleInfo as unknown as React.ElementType;

export const AchievementsHeader: React.FC = () => {
  const { descColor } = useAchievementsGridColors();
  return (
    <>
      <HStack justify="center" spacing={2} mt={6} mb={1}>
        <Icon as={FaCircleInfoElement} />
        <Heading size="sm" textAlign="center">Достижения</Heading>
      </HStack>
      <Text fontSize="xs" textAlign="center" mb={4} color={descColor}>
        Собирайте значки за активность: решайте задачи, держите серии, изучайте материалы и делитесь обратной связью.
      </Text>
    </>
  );
};


