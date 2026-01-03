import React from 'react';
import { Box, Fade, Portal, useMediaQuery } from '@chakra-ui/react';
import useLessonFeedbackColors from './colors/useLessonFeedBackColors';
import { Props } from './types';
import { useFeedbackController } from '../hooks/useFeedbackController';
import { useFeedbackContext } from '../hooks/useFeedbackContext';
import { getImprovementTexts } from '../data/improvementTexts';
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
    thanksColor,
  } = useLessonFeedbackColors();
  const [isWide] = useMediaQuery('(min-width: 1025px)');
  const { choice, visible, showThanks, pulsing, vote } = useFeedbackController(lessonKey);
  const [improveReason, setImproveReason] = React.useState<'short' | 'hard' | 'errors' | null>(null);
  const context = useFeedbackContext(lessonKey);
  const improveTexts = React.useMemo(() => getImprovementTexts(context), [context]);

  React.useEffect(() => {
    // Reset the "improve" explanation when we (re)start the flow.
    if (!showThanks) setImproveReason(null);
  }, [lessonKey, showThanks]);

  const handleVote = React.useCallback((v: 'up' | 'down') => {
    setImproveReason(null);
    vote(v);
    onVoteChange?.(v);
  }, [onVoteChange, vote]);

  const content = !showThanks ? (
    <QuestionRow
      text={questionText || 'Эта страница была полезна?'}
      choice={choice}
      pulsing={pulsing}
      onVoteUp={() => handleVote('up')}
      onVoteDown={() => handleVote('down')}
      textCol={textCol}
      upColor={upColor}
      downColor={downColor}
      chipBg={chipBg}
      chipHover={chipHover}
      thumbIdleColor={thumbIdleColor}
    />
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
  );

  if (!isWide) return null;

  return (
    <Portal>
      <Fade in={visible} unmountOnExit>
        <Box
          position="fixed"
          left={{ base: '16px', md: '24px' }}
          bottom="24px"
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
          {content}
        </Box>
      </Fade>
    </Portal>
  );
};

export default LessonFeedback;


