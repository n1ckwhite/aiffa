import React from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { useUserProfile } from 'entities/user';
import { ModulesFAQ } from 'widgets/Modules';
import SupportBlock from 'widgets/SupportBlock';
import WeeklyTasksHeader from '../Header/Header';
import WeeklyTasksPromo from '../Promo/Promo';
import WeeklyTasksTierBadge from '../TierBadge/parts/TierBadge/TierBadge';
import WeeklyTasksGrid from '../TasksGrid/TasksGrid';
import { useWeeklyTasksData } from '../TasksGrid/model/useWeeklyTasksData';
import { useTierMeta } from '../../hooks/useTierMeta';
import WeeklyTasksCountdown from '../Countdown/Countdown';

const WeeklyTasksScreen: React.FC = () => {
  const { profile } = useUserProfile();
  const xp = typeof (profile as any).xp === 'number' && isFinite((profile as any).xp) ? Math.max(0, (profile as any).xp) : 0;
  const { label: tierLabel } = useTierMeta(xp);
  const { isReady, tasks } = useWeeklyTasksData();

  if (!isReady) {
    return (
      <Box position="relative" pb="32px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <Box w="100%" maxW="1440px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
          <VStack spacing={4} mb={6}>
            <Box h="28px" w="200px" borderRadius="md" bg="blackAlpha.200" />
            <Box h="18px" w="60%" borderRadius="md" bg="blackAlpha.200" />
          </VStack>
          <Box h="120px" borderRadius="2xl" borderWidth="1px" borderColor="blackAlpha.200" />
        </Box>
      </Box>
    );
  }

  return (
    <Box position="relative" pb="32px">
      <Box w="100%" maxW="1440px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <WeeklyTasksHeader />
        <WeeklyTasksPromo />
        <VStack spacing={3} mb={6}>
          <HStack spacing={4} wrap="wrap" justify="center" mt={1}>
            <WeeklyTasksTierBadge label={tierLabel} />
          </HStack>
          <WeeklyTasksCountdown />
        </VStack>
        <WeeklyTasksGrid tasks={tasks as any} tierLabel={tierLabel as any} />
      </Box>
      <Box px={{ base: 4, md: 6 }} mt={6}>
        <VStack align="stretch" gap={{ base: 5, md: 7 }} maxW={{ base: '100%', md: '900px' }} mx="auto">
          <ModulesFAQ variant="xp" showSupportBlock={false} />
          <SupportBlock variant="weekly" />
        </VStack>
      </Box>
    </Box>
  );
};

export default WeeklyTasksScreen;


