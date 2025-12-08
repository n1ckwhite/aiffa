import React from 'react';
import { Box, Fade, Portal } from '@chakra-ui/react';
import { useLessonFeedbackColors } from '../../colors';
import { useMinWidthViewport } from '../../hooks/useViewport';
import { useFeedbackController } from '../../hooks/useFeedbackController';
import type { LessonFeedbackProps } from '../../types';
import { useFeedbackVisibility } from '../../hooks/useFeedbackVisibility';
import { useImprovementTexts } from '../../hooks/useImprovementTexts';
import { QuestionRow } from '../parts/QuestionRow';
import { DownImproveBlock } from '../parts/DownImproveBlock';
import { UpThanksBlock } from '../parts/UpThanksBlock';
import { GenericThanks } from '../parts/GenericThanks';

const LessonFeedback: React.FC<LessonFeedbackProps> = ({
  lessonKey,
  questionText,
  onVoteChange,
}) => {
  const isWide = useMinWidthViewport(1025);
  const { choice, mounted, visible, showThanks, pulsing, vote } = useFeedbackController(lessonKey);
  const { cardBg, cardShadow, border, textCol, chipBg, chipHover, upColor, downColor, thumbIdleColor, thanksColor } =
    useLessonFeedbackColors();

  const [improveReason, setImproveReason] = React.useState<'short' | 'hard' | 'errors' | null>(null);

  const { context, shouldShowQuestion, shouldShowThanks } = useFeedbackVisibility(
    lessonKey,
    isWide,
    showThanks,
  );

  const {
    shortLabel,
    hardLabel,
    errorsLabel,
    shortExplanation,
    hardExplanation,
    errorsExplanation,
  } = useImprovementTexts(context);

  if (!mounted) return null;

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
          {!shouldShowThanks ? (
            // Вопрос "Эта страница была полезна?" показываем только после CTA.
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
              texts={{
                shortLabel,
                hardLabel,
                errorsLabel,
                shortExplanation,
                hardExplanation,
                errorsExplanation,
              }}
              thanksColor={thanksColor}
              textCol={textCol}
              chipBg={chipBg}
              chipHover={chipHover}
              border={border}
            />
          ) : choice === 'up' ? (
            <UpThanksBlock thanksColor={thanksColor} textCol={textCol} upColor={upColor} />
          ) : (
            <GenericThanks thanksColor={thanksColor} />
          )}
        </Box>
      </Fade>
    </Portal>
  );
};

export default LessonFeedback;


