import React from 'react';
import { Box, Fade, HStack, IconButton, Portal, Text, VStack, Button } from '@chakra-ui/react';
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons';
import { useLessonFeedbackColors } from '../../colors';
import { useMinWidthViewport } from '../../hooks/useViewport';
import { useFeedbackController } from '../../hooks/useFeedbackController';
import type { LessonFeedbackProps, VoteChoice } from '../../types';
import { pressDown, pressUp } from '../../animations';
import { ThumbUp } from '../parts/ThumbUp';
import { ThumbDown } from '../parts/ThumbDown';

const LessonFeedback: React.FC<LessonFeedbackProps> = ({ lessonKey, questionText, onVoteChange, onSupportClick }) => {
  const isWide = useMinWidthViewport(1025);
  const { choice, mounted, visible, showThanks, pulsing, vote } = useFeedbackController(lessonKey);
  const { cardBg, cardShadow, border, textCol, chipBg, chipHover, upColor, downColor, thumbIdleColor, thanksColor } = useLessonFeedbackColors();

  const [improveReason, setImproveReason] = React.useState<'short' | 'hard' | 'errors' | null>(null);

  const isTasksPageFeedback = React.useMemo(
    () => lessonKey.endsWith('/tasks'),
    [lessonKey],
  );

  const isProjectFeedback = React.useMemo(
    () => lessonKey.startsWith('project/'),
    [lessonKey],
  );

  // Для мобильных: показываем вопрос только после того, как пользователь хотя бы раз дошёл
  // до триггерного блока:
  // - для страниц уроков — "Перейти к задачам"
  // - для страниц задач — FAQ по задачам.
  // Блок с благодарностью после лайка/дизлайка отображается независимо от позиции скролла.
  const [hasReachedTasksCta, setHasReachedTasksCta] = React.useState<boolean>(isWide);

  const {
    shortLabel,
    hardLabel,
    errorsLabel,
    shortExplanation,
    hardExplanation,
    errorsExplanation,
  } = React.useMemo(() => {
    // Тексты по умолчанию — для страниц материалов (уроков).
    let base = {
      shortLabel: 'Хочу больше примеров',
      hardLabel: 'Сложно читать',
      errorsLabel: 'Нашёл неточность',
      shortExplanation: 'Добавим больше практических примеров и разборов кода.',
      hardExplanation: 'Постараемся упростить формулировки и улучшить структуру материала.',
      errorsExplanation: 'Перепроверим текст и исправим неточности и опечатки.',
    };

    if (isTasksPageFeedback) {
      base = {
        shortLabel: 'Слишком поверхностно',
        hardLabel: 'Сложно разобраться',
        errorsLabel: 'Что-то сломано',
        shortExplanation: 'Добавим больше примеров и деталей, чтобы задача была понятнее.',
        hardExplanation:
          'Постараемся упростить формулировки, разбить решение на шаги и подсветить ключевые идеи.',
        errorsExplanation: 'Перепроверим условие и проверку задачи, исправим баги и неточности.',
      };
    } else if (isProjectFeedback) {
      base = {
        shortLabel: 'Сложно запуститься',
        hardLabel: 'Неясны шаги',
        errorsLabel: 'Мало контекста',
        shortExplanation: 'Улучшим инструкцию по запуску: добавим шаги и проверим окружение.',
        hardExplanation: 'Разобьём описание проекта на более понятные шаги и чек-лист.',
        errorsExplanation: 'Добавим больше пояснений, ссылок и примеров использования проекта.',
      };
    }

    return base;
  }, [isTasksPageFeedback, isProjectFeedback]);

  React.useEffect(() => {
    if (isWide) {
      setHasReachedTasksCta(true);
      return;
    }

    const handlePositionCheck = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      const anchorId = isTasksPageFeedback ? 'tasks-faq-anchor' : 'lesson-tasks-cta-anchor';
      const anchor = document.getElementById(anchorId);
      if (!anchor) {
        return;
      }
      const rect = anchor.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const reachedNow = rect.top <= viewportHeight * 0.7;
      if (reachedNow) {
        setHasReachedTasksCta(true);
      }
    };

    handlePositionCheck();
    window.addEventListener('scroll', handlePositionCheck);
    window.addEventListener('resize', handlePositionCheck);

    return () => {
      window.removeEventListener('scroll', handlePositionCheck);
      window.removeEventListener('resize', handlePositionCheck);
    };
  }, [isWide, isTasksPageFeedback]);

  if (!mounted) return null;

  const shouldShowQuestion = !showThanks && hasReachedTasksCta;
  const shouldShowThanks = showThanks;

  // Если ещё не дошли до CTA и пользователь не голосовал, ничего не показываем вообще.
  if (!shouldShowQuestion && !shouldShowThanks) {
    return null;
  }

  return (
    <Portal>
      <Fade in={visible} unmountOnExit>
        <Box
          position="fixed"
          left={{ base: '12px', md: '24px' }}
          right={{ base: '12px', md: 'auto' }}
          bottom={{ base: `calc(16px + env(safe-area-inset-bottom))`, md: `calc(32px + env(safe-area-inset-bottom))` }}
          zIndex={1200}
          bg={cardBg}
          borderWidth="1px"
          borderColor={border}
          borderRadius="16px"
          px={{ base: 3, md: 4 }}
          py={{ base: 2.5, md: 3 }}
          boxShadow={cardShadow}
        >
          {!showThanks ? (
            // Вопрос "Эта страница была полезна?" показываем только после CTA.
            shouldShowQuestion ? (
              <HStack spacing={3} align="center" justifyContent="space-between">
                <Text fontSize="md" fontWeight="semibold" color={textCol} pr={2}>
                  {questionText || 'Эта страница была полезна?'}
                </Text>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Полезно"
                    icon={<ThumbUp />}
                    variant="ghost"
                    borderRadius="12px"
                    bg={choice === 'up' ? upColor : chipBg}
                    color={choice === 'up' ? 'white' : thumbIdleColor}
                    _hover={{ bg: choice === 'up' ? upColor : chipHover }}
                    _active={{ transform: 'scale(0.96)' }}
                    animation={pulsing === 'up' ? `${pressUp} 0.45s ease` : undefined}
                    onClick={() => {
                      vote('up');
                      if (onVoteChange) {
                        onVoteChange('up');
                      }
                    }}
                    transition="all 0.15s ease"
                  />
                  <IconButton
                    aria-label="Не полезно"
                    icon={<ThumbDown />}
                    variant="ghost"
                    borderRadius="12px"
                    bg={choice === 'down' ? downColor : chipBg}
                    color={choice === 'down' ? 'white' : thumbIdleColor}
                    _hover={{ bg: choice === 'down' ? downColor : chipHover }}
                    _active={{ transform: 'scale(0.96)' }}
                    animation={pulsing === 'down' ? `${pressDown} 0.45s ease` : undefined}
                    onClick={() => {
                      vote('down');
                      if (onVoteChange) {
                        onVoteChange('down');
                      }
                    }}
                    transition="all 0.15s ease"
                  />
                </HStack>
              </HStack>
            ) : null
          ) : choice === 'down' && !improveReason ? (
            <VStack align="flex-start" spacing={2}>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color={thanksColor}
              >
                Спасибо за обратную связь!
              </Text>
              <Text fontSize="xs" color={textCol}>
                Можно улучшить что-то?
              </Text>
              <HStack spacing={2} pt={0.5} flexWrap="wrap">
                <Button
                  size="sm"
                  px={4}
                  py={1}
                  borderRadius="full"
                  variant={improveReason === 'short' ? 'solid' : 'outline'}
                  bg={improveReason === 'short' ? chipHover : chipBg}
                  _hover={{ bg: chipHover }}
                  _active={{ bg: chipHover }}
                  borderColor={border}
                  color={improveReason === 'short' ? 'white' : textCol}
                  minW="max-content"
                  onClick={() => setImproveReason('short')}
                >
                  {shortLabel}
                </Button>
                <Button
                  size="sm"
                  px={4}
                  py={1}
                  borderRadius="full"
                  variant={improveReason === 'hard' ? 'solid' : 'outline'}
                  bg={improveReason === 'hard' ? chipHover : chipBg}
                  _hover={{ bg: chipHover }}
                  _active={{ bg: chipHover }}
                  borderColor={border}
                  color={improveReason === 'hard' ? 'white' : textCol}
                  minW="max-content"
                  onClick={() => setImproveReason('hard')}
                >
                  {hardLabel}
                </Button>
                <Button
                  size="sm"
                  px={4}
                  py={1}
                  borderRadius="full"
                  variant={improveReason === 'errors' ? 'solid' : 'outline'}
                  bg={improveReason === 'errors' ? chipHover : chipBg}
                  _hover={{ bg: chipHover }}
                  _active={{ bg: chipHover }}
                  borderColor={border}
                  color={improveReason === 'errors' ? 'white' : textCol}
                  minW="max-content"
                  onClick={() => setImproveReason('errors')}
                >
                  {errorsLabel}
                </Button>
              </HStack>
              {improveReason && (
                <Text fontSize="xs" color={textCol} pt={0.5}>
                  {improveReason === 'short' && shortExplanation}
                  {improveReason === 'hard' && hardExplanation}
                  {improveReason === 'errors' && errorsExplanation}
                </Text>
              )}
            </VStack>
          ) : choice === 'up' ? (
            <VStack align="flex-start" spacing={1.5}>
              <HStack align="center" spacing={2}>
                <CheckCircleIcon boxSize={4} color={thanksColor} />
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color={thanksColor}
                >
                  Спасибо! За ваш отзыв!
                </Text>
              </HStack>
              <VStack align="flex-start" spacing={0.5} fontSize="xs" color={textCol}>
                <Text as="span">Автор увидит вашу поддержку ✨</Text>
                <HStack spacing={1} align="center" fontWeight="semibold" color={upColor}>
                  <Text as="span">Поставьте звезду</Text>
                  <StarIcon boxSize={3} color={upColor} />
                </HStack>
              </VStack>
            </VStack>
          ) : (
            <HStack align="center" spacing={2}>
              <CheckCircleIcon boxSize={4} color={thanksColor} />
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color={thanksColor}
              >
                Спасибо за ваш отзыв!
              </Text>
            </HStack>
          )}
        </Box>
      </Fade>
    </Portal>
  );
};

export default LessonFeedback;


