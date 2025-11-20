import React from 'react';
import { keyframes } from '@emotion/react';
import { Box, HStack, Text, IconButton, useColorModeValue, Fade, Portal } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';
import { CheckCircleIcon } from '@chakra-ui/icons';

type Props = {
  lessonKey: string;
  questionText?: string;
};

const ThumbUp: React.FC<{ color?: string }> = ({ color }) => (
  <Box as="svg" viewBox="0 0 24 24" boxSize={5} fill="none" color={color || 'currentColor'}>
    <path d="M2 10.5a1.5 1.5 0 0 1 1.5-1.5H7v9H3.5A1.5 1.5 0 0 1 2 16.5v-6z" fill="currentColor"/>
    <path d="M9 19h6.764c.716 0 1.36-.428 1.64-1.09l2.27-5.317A1.8 1.8 0 0 0 18 10h-5.5l.7-3.513c.135-.678-.306-1.336-.984-1.47-.429-.086-.87.08-1.134.436L9 8.5V19z" fill="currentColor"/>
  </Box>
);

const ThumbDown: React.FC<{ color?: string }> = ({ color }) => (
  <Box as="svg" viewBox="0 0 24 24" boxSize={5} fill="none" color={color || 'currentColor'}>
    <path d="M22 13.5a1.5 1.5 0 0 1-1.5 1.5H17v-9h3.5A1.5 1.5 0 0 1 22 7.5v6z" fill="currentColor"/>
    <path d="M15 5H8.236c-.716 0-1.36.428-1.64 1.09L4.327 11.41A1.8 1.8 0 0 0 6 15h5.5l-.7 3.513a1.25 1.25 0 0 0 2.118 1.034L15 15.5V5z" fill="currentColor"/>
  </Box>
);

const LessonFeedback: React.FC<Props> = ({ lessonKey, questionText }) => {
  const [choice, setChoice] = React.useState<'up' | 'down' | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [showThanks, setShowThanks] = React.useState(false);
  const [showOnThisViewport, setShowOnThisViewport] = React.useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1025px)').matches : false
  );

  const theme = useAppColors();
  const cardBg = theme.cardBg;
  const cardShadow = useColorModeValue('0 10px 30px rgba(0,0,0,0.08)', '0 10px 30px rgba(0,0,0,0.5)');
  const border = theme.borderColor;
  const textCol = theme.titleColor;
  const chipBg = theme.controlsBg;
  const chipHover = theme.cardHoverBg;
  const upColor = 'green.500';
  const downColor = 'red.500';
  const thumbIdleColor = theme.descColor;
  const thanksColor = 'green.600';

  React.useEffect(() => {
    setChoice(null);
    setVisible(true);
    setShowThanks(false);
    setMounted(true);
  }, [lessonKey]);

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 1025px)');
    const onChange = () => setShowOnThisViewport(mql.matches);
    onChange();
    try { mql.addEventListener('change', onChange); } catch { (mql as any).addListener(onChange); }
    return () => {
      try { mql.removeEventListener('change', onChange); } catch { (mql as any).removeListener(onChange); }
    };
  }, []);

  const pressUp = keyframes`
    0% { transform: scale(1) translate(0, 0) rotate(0deg); }
    45% { transform: scale(1.12) translate(3px, -3px) rotate(-6deg); }
    100% { transform: scale(1) translate(0, 0) rotate(0deg); }
  `;
  const pressDown = keyframes`
    0% { transform: scale(1) translate(0, 0) rotate(0deg); }
    45% { transform: scale(1.12) translate(3px, 3px) rotate(6deg); }
    100% { transform: scale(1) translate(0, 0) rotate(0deg); }
  `;
  const [pulsing, setPulsing] = React.useState<'up' | 'down' | null>(null);

  const vote = (v: 'up' | 'down') => {
    setChoice(v);
    setPulsing(v);
    window.setTimeout(() => { setShowThanks(true); }, 250);
    window.setTimeout(() => { setVisible(false); setPulsing(null); }, 1600);
  };

  if (!mounted || !showOnThisViewport) return null;

  return (
    <Portal>
      <Fade in={visible} unmountOnExit>
        <Box
          position="fixed"
          left={{ base: '16px', md: '24px' }}
          bottom={{ base: `calc(24px + env(safe-area-inset-bottom))`, md: `calc(32px + env(safe-area-inset-bottom))` }}
          zIndex={1200}
          bg={cardBg}
          borderWidth="1px"
          borderColor={border}
          borderRadius="16px"
          px={4}
          py={3}
          boxShadow={cardShadow}
        >
          {!showThanks ? (
            <HStack spacing={3} align="center">
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
                  onClick={() => vote('up')}
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
                  onClick={() => vote('down')}
                  transition="all 0.15s ease"
                />
              </HStack>
            </HStack>
          ) : (
            <HStack spacing={2} align="center">
              <CheckCircleIcon color={thanksColor} />
              <Text fontSize="md" fontWeight="semibold" color={thanksColor}>Спасибо за ваш отзыв!</Text>
            </HStack>
          )}
        </Box>
      </Fade>
    </Portal>
  );
};

export default LessonFeedback;


