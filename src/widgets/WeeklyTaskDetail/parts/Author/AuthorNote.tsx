import React from 'react';
import { HStack, Text, Avatar, Box, Link as ChakraLink, Icon, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FiMessageCircle, FiUserCheck } from 'react-icons/fi';
import { useAuthorColors } from '../../colors/useAuthorColors';
import { useAuthorCardColors } from 'widgets/LessonPageView/ui/LessonPageView/parts/AuthorCard/colors/useAuthorCardColors';
import { useAuthorSupportTexts } from 'widgets/LessonPageView/ui/LessonPageView/parts/AuthorCard/features/useAuthorSupportTexts';
import { AuthorNoteProps } from './types';

const AuthorNote: React.FC<AuthorNoteProps> = ({
  name,
  href,
  avatar,
  note,
  starsCount,
  commentsCount,
  solvedCount,
}) => {
  const { text, link, noteBg, noteBorder, noteColor, starInactive, starActive } = useAuthorColors();
  const baseStars = typeof starsCount === 'number' ? starsCount : 37;
  const effectiveComments = typeof commentsCount === 'number' ? commentsCount : 12;
  const effectiveSolved = typeof solvedCount === 'number' ? solvedCount : 128;
  const [currentStars, setCurrentStars] = React.useState(baseStars);
  const [isStarred, setIsStarred] = React.useState(false);

  const { tooltipLabel, supportLabel } = useAuthorSupportTexts(isStarred);

  const {
    badgeBg,
    badgeBorder,
    badgeTextColor,
    hoverBg,
    activeBg,
    tooltipBg,
    tooltipTextColor,
  } = useAuthorCardColors(isStarred);

  const handleToggleSupport = React.useCallback(() => {
    setIsStarred((prev) => {
      setCurrentStars((count) => count + (prev ? -1 : 1));
      return !prev;
    });
  }, []);
  return (
    <Box
      role="note"
      aria-label="Совет автора"
      bg={noteBg}
      borderWidth="1px"
      borderColor={noteBorder}
      color={noteColor}
      borderRadius="xl"
      p={3}
    >
      <HStack spacing={3} align="flex-start">
        <Avatar
          size="sm"
          name={name}
          src={avatar}
          srcSet={avatar ? `${avatar.replace('?s=80','?s=40')} 1x, ${avatar} 2x` : undefined}
          loading="lazy"
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Text fontSize="sm" color={text}>
            Автор:{' '}
            <ChakraLink href={href} isExternal color={link} fontWeight="semibold">
              {name}
            </ChakraLink>
          </Text>
          <Text fontSize="sm" color={text}>
            Спасибо за вклад в сообщество! &#x2728;
          </Text>
          <Text fontSize="sm" color={text}>
            <b>Совет автора:</b> {note}
          </Text>
          <HStack
            mt={2}
            spacing={{ base: 2, md: 3 }}
            fontSize="xs"
            color={text}
            flexWrap="wrap"
            alignItems="center"
            rowGap={1}
          >
            <>
              <HStack spacing={1} flexShrink={0}>
                <Box as="span">{currentStars}</Box>
                <StarIcon boxSize={3} color={isStarred ? starActive : starInactive} flexShrink={0} />
              </HStack>
              <Tooltip
                label={tooltipLabel}
                hasArrow
                placement="top"
                bg={tooltipBg}
                color={tooltipTextColor}
                px={3}
                py={2}
                borderRadius="lg"
                fontSize="xs"
                fontWeight="semibold"
                whiteSpace="nowrap"
                boxShadow="0 10px 30px rgba(15,23,42,0.65)"
              >
                <Box
                  as="button"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  px={3}
                  py={1}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={badgeBorder}
                  bg={badgeBg}
                  color={badgeTextColor}
                  cursor="pointer"
                  fontWeight="semibold"
                  letterSpacing="-0.01em"
                  boxShadow="none"
                  transition="background-color 0.18s ease-out, color 0.18s ease-out, border-color 0.18s ease-out"
                  onClick={handleToggleSupport}
                  aria-pressed={isStarred}
                  _hover={{ bg: hoverBg }}
                  _active={{ bg: activeBg }}
                >
                  <Box as="span">
                    {supportLabel}
                  </Box>
                </Box>
              </Tooltip>
            </>
            <HStack spacing={1} flexShrink={0}>
              <Box as="span">{effectiveComments}</Box>
              <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} />
            </HStack>
            <HStack spacing={1} flexShrink={0}>
              <Box as="span">{effectiveSolved}</Box>
              <Icon as={FiUserCheck} boxSize={3.5} flexShrink={0} />
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default AuthorNote;


