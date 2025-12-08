import React from 'react';
import { Avatar, Box, HStack, Link, Text, VStack, Tooltip, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FiEye, FiMessageCircle } from 'react-icons/fi';
import type { AuthorCardProps } from './types';
import { formatCount } from 'shared/functions/formatCount';
import { useAuthorCardColors } from './colors/useAuthorCardColors';
import { useAuthorSupportTexts } from './features/useAuthorSupportTexts';

export const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  borderColor,
  descColor,
  linkColor,
  starsCount,
  viewsCount,
  commentsCount,
  isStarred,
  onToggleStar,
  context,
}) => {
  if (!author) return null;

  const { tooltipLabel, supportLabel } = useAuthorSupportTexts(
    isStarred ?? false,
    context ?? 'lesson',
  );

  const {
    badgeBg,
    badgeBorder,
    badgeTextColor,
    hoverBg,
    activeBg,
    tooltipBg,
    tooltipTextColor,
    starMetaColor,
  } = useAuthorCardColors(isStarred ?? false);

  return (
    <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={{ base: 3, md: 4 }} bg="transparent">
      <HStack spacing={3} align="center">
        <Avatar name={author.name} src={`https://avatars.githubusercontent.com/${author.username}?s=80`} boxSize={{ base: '32px', md: '36px' }} />
        <VStack spacing={1} align="start">
          <Text fontSize="sm" color={descColor}>
            Автор:{' '}
            <Link href={`https://github.com/${author.username}`} isExternal color={linkColor} fontWeight="semibold">
              {author.name}
            </Link>
          </Text>
          <Text fontSize="xs" color={descColor}>Спасибо за вклад в сообщество! &#x2728;</Text>
          <HStack
            spacing={{ base: 2, md: 3 }}
            fontSize="xs"
            color={descColor}
            mt={1}
            flexWrap="wrap"
            alignItems="center"
            rowGap={1}
          >
            {typeof starsCount === 'number' && (
              <>
                <HStack spacing={1} flexShrink={0}>
                  <Box as="span">{formatCount(starsCount)}</Box>
                  <StarIcon boxSize={3} color={starMetaColor} flexShrink={0} />
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
                    as={onToggleStar ? 'button' : 'div'}
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
                    cursor={onToggleStar ? 'pointer' : 'default'}
                    fontWeight="semibold"
                    letterSpacing="-0.01em"
                    boxShadow="none"
                    transition="background-color 0.18s ease-out, color 0.18s ease-out, border-color 0.18s ease-out"
                    _hover={
                      onToggleStar
                        ? { bg: hoverBg }
                        : undefined
                    }
                    _active={
                      onToggleStar
                        ? { bg: activeBg }
                        : undefined
                    }
                    onClick={onToggleStar}
                    aria-pressed={onToggleStar ? !!isStarred : undefined}
                  >
                    <Box as="span">
                      {supportLabel}
                    </Box>
                  </Box>
                </Tooltip>
              </>
            )}
            {typeof viewsCount === 'number' && (
              <HStack spacing={1} flexShrink={0}>
                <Box as="span">{formatCount(viewsCount)}</Box>
                <Icon as={FiEye} boxSize={3.5} flexShrink={0} />
              </HStack>
            )}
            {typeof commentsCount === 'number' && (
              <HStack spacing={1} flexShrink={0}>
                <Box as="span">{formatCount(commentsCount)}</Box>
                <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} />
              </HStack>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};


