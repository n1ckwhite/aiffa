import React from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import StageBreadcrumb from 'shared/ui/StageBreadcrumb';
import TaskCompletionModal from 'features/TaskCompletionModal';
import type { LessonTasksViewProps } from '../../types';
import { TasksHeader } from './parts/Header';
import { TasksList } from './parts/TasksList';
import { AuthorCard } from 'widgets/LessonPageView/ui/LessonPageView/parts/AuthorCard';
import { ModulesFAQ } from 'widgets/Modules';
import { useLessonTasksView } from '../hooks/useLessonTasksView';

export const LessonTasksView: React.FC<LessonTasksViewProps> = ({ mod, lesson, onTaskSolvedChange }) => {
  const {
    colors,
    tasks,
    hasTasks,
    taskAuthors,
    solvedById,
    solvedCount,
    celebrate,
    handleSetSolved,
    handleValidated,
    handleCloseModal,
    handleContinueAfterModal,
  } = useLessonTasksView({ mod, lesson, onTaskSolvedChange });

  return (
    <VStack align="stretch" gap={6} pb="32px">
      <Box maxW="1280px" mx="auto" w="100%" px={0}>
        <StageBreadcrumb moduleId={mod.id} moduleTitle={mod.title} lessonId={lesson.id} lessonTitle={lesson.title} current="tasks" />

        <Box bg={colors.cardBg} borderWidth={0} borderRadius="xl" px={0} position="relative" boxShadow="none" _after={{ content: '""', position: 'absolute', left: 6, right: 6, bottom: 0, height: { base: '0px', md: '4px' }, bg: `linear-gradient(90deg, ${colors.accent}, ${colors.headerGlow})`, borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
          <TasksHeader
            hasTasks={hasTasks}
            solvedCount={solvedCount}
            total={tasks.length}
            colors={{
              chipBgRed: colors.chipBgRed, chipBgYellow: colors.chipBgYellow, chipBgGreen: colors.chipBgGreen,
              chipTextRed: colors.chipTextRed, chipTextYellow: colors.chipTextYellow, chipTextGreen: colors.chipTextGreen,
              editIconBg: colors.editIconBg, accent: colors.accent,
              backBtnHoverBg: colors.backBtnHoverBg, backBtnActiveBg: colors.backBtnActiveBg
            }}
            moduleId={mod.id}
            lessonId={lesson.id}
          />
          {taskAuthors.map((author) => (
            <Box key={`${author.username}-${author.name}`}>
              <AuthorCard
                author={author}
                borderColor={colors.authorBorder}
                descColor={colors.descColor}
                linkColor={colors.linkColor}
              />
            </Box>
          ))}
          <TasksList
            moduleId={mod.id}
            lesson={lesson}
            solvedById={solvedById}
            setSolved={handleSetSolved}
            descColor={colors.descColor}
            accent={colors.accent}
            borderColor={colors.borderColor}
            indexChipBg={colors.indexChipBg}
            taskCardBg={colors.taskCardBg}
            taskCardBorder={colors.taskCardBorder}
            taskCardHoverBg={colors.taskCardHoverBg}
            linkColor={colors.linkColor}
            onValidated={handleValidated}
          />
        </Box>
      </Box>

      {celebrate && (
        <TaskCompletionModal
          completed={solvedCount === tasks.length}
          onClose={handleCloseModal}
          onContinue={handleContinueAfterModal}
        />
      )}

      {/* Кнопка "К уроку" перед блоком FAQ / поддержки */}
      <Box px={0}>
        <VStack
          align="stretch"
          maxW={{ base: '100%', md: '900px' }}
          mx="auto"
        >
          <Button
            as={RouterLink}
            to={`/learn/${mod.id}/${lesson.id}`}
            size="sm"
            variant="outline"
            colorScheme="blue"
            leftIcon={<ChevronLeftIcon />}
            borderRadius="full"
            w={{ base: '100%', md: 'auto' }}
            alignSelf={{ base: 'stretch', md: 'flex-start' }}
            borderColor={colors.backBtnHoverBg}
            bg="transparent"
            _hover={{ bg: colors.backBtnHoverBg }}
            _active={{ bg: colors.backBtnActiveBg }}
          >
            К уроку
          </Button>
        </VStack>
      </Box>

      <Box px={0}>
        <VStack align="stretch" gap={{ base: 5, md: 7 }} maxW={{ base: '100%', md: '900px' }} mx="auto">
          <ModulesFAQ variant="tasks" />
        </VStack>
      </Box>
    </VStack>
  );
};


