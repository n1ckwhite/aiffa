import React from 'react';
import { Box, Fade, Portal } from '@chakra-ui/react';
import useLessonFeedbackColors from './colors/useLessonFeedBackColors';
import { useMinWidthViewport } from '../hooks/useViewport';
import { Props } from './types';
import { useFeedbackController } from '../hooks/useFeedbackController';
import { useFeedbackVisibility } from '../hooks/useFeedbackVisibility';
import { useImprovementTexts } from '../hooks/useImprovementTexts';
import { QuestionRow } from './parts/QuestionRow';
import { DownImproveBlock } from './parts/DownImproveBlock';
import { UpThanksBlock } from './parts/UpThanksBlock';
import { GenericThanks } from './parts/GenericThanks';

const LessonFeedback: React.FC<Props> = ({ lessonKey, questionText, onVoteChange, onSupportClick }) => {
  const {
    cardBg,
    cardShadow,
    border,
    textCol,
    chipBg,
    chipHover,
    upColor,
    downColor,
    thumbIdleColor,
    selectedThumbColor,
    thanksColor,
  } = useLessonFeedbackColors();
  const isWide = useMinWidthViewport(1025);
  const { choice, mounted, visible, showThanks, pulsing, vote } = useFeedbackController(lessonKey);
  const [improveReason, setImproveReason] = React.useState<'short' | 'hard' | 'errors' | null>(null);
  const { context, shouldShowQuestion, shouldShowThanks } = useFeedbackVisibility(lessonKey, isWide, showThanks);
  const improveTexts = useImprovementTexts(context);

  if (!mounted) return null;

  // If user hasn't reached the trigger and no "thanks" state yet — render nothing.
  if (!shouldShowQuestion && !shouldShowThanks) {
    return null;
  }

  return (
    <Portal>
      <Fade in={visible} unmountOnExit>
        <Box
          position="fixed"
          left={{ base: '16px', md: '24px' }}
          bottom={{ base: `calc(24px + env(safe-area-inset-bottom) + var(--vvb, 0px))`, md: `calc(32px + env(safe-area-inset-bottom) + var(--vvb, 0px))` }}
          zIndex={1200}
          bg={cardBg}
          borderWidth="1px"
          borderColor={border}
          borderRadius="16px"
          px={4}
          py={3}
          boxShadow={cardShadow}
          maxW={{ base: 'calc(100vw - 32px)', md: 'calc(100vw - 48px)' }}
          w="auto"
        >
          {!shouldShowThanks ? (
            shouldShowQuestion ? (
              <QuestionRow
                text={questionText || 'Эта страница была полезна?'}
                choice={choice}
                pulsing={pulsing}
                onVoteUp={() => {
                  vote('up');
                  if (onVoteChange) {
                    onVoteChange('up');
                  }
                }}
                onVoteDown={() => {
                  vote('down');
                  if (onVoteChange) {
                    onVoteChange('down');
                  }
                }}
                textCol={textCol}
                upColor={upColor}
                downColor={downColor}
                chipBg={chipBg}
                chipHover={chipHover}
                thumbIdleColor={thumbIdleColor}
              />
            ) : null
          ) : choice === 'down' ? (
            <DownImproveBlock
              improveReason={improveReason}
              onChangeReason={setImproveReason}
              texts={improveTexts}
              thanksColor={thanksColor}
              textCol={textCol}
              chipBg={chipBg}
              chipHover={chipHover}
              border={border}
            />
          ) : choice === 'up' ? (
            <UpThanksBlock thanksColor={thanksColor} textCol={textCol} upColor={upColor} onSupportClick={onSupportClick} />
          ) : (
            <GenericThanks thanksColor={thanksColor} />
          )}
        </Box>
      </Fade>
    </Portal>
  );
};

export default LessonFeedback;


