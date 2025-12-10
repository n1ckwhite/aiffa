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
import WeeklyTasksSkeleton from 'pages/WeeklyTasksPage/Skeleton';

const WeeklyTasksScreen: React.FC = () => {
  const { profile } = useUserProfile();
  const xp = typeof (profile as any).xp === 'number' && isFinite((profile as any).xp) ? Math.max(0, (profile as any).xp) : 0;
  const { label: tierLabel } = useTierMeta(xp);
  // const { isReady, tasks } = useWeeklyTasksData();

  // if (!isReady) {
  //   return <WeeklyTasksSkeleton />;
  // }

  return (
    <Box as="section" position="relative" pb="32px" aria-labelledby="weekly-tasks-title">
      <Box w="100%" maxW="1440px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <Box as="header">
          <WeeklyTasksHeader />
        </Box>
        <WeeklyTasksPromo />
        <VStack spacing={3} mb={6}>
          <WeeklyTasksCountdown />
        </VStack>
        {/* <WeeklyTasksGrid tasks={tasks as any} tierLabel={tierLabel as any} /> */}
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


