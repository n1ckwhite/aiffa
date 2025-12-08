import React from 'react';
import { Avatar, Box, HStack, Link, Text, VStack, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { StarIcon, ViewIcon, ChatIcon } from '@chakra-ui/icons';
import type { AuthorCardProps } from './types';
import { formatCount } from 'shared/functions/formatCount';

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
}) => {
  if (!author) return null;

  const tooltipLabel = isStarred
    ? 'Спасибо за вклад! Автор увидит вашу поддержку'
    : 'Отметить материал полезным';

  const badgeBg = useColorModeValue(
    isStarred ? 'rgba(59,130,246,0.08)' : 'transparent',
    isStarred ? 'rgba(129,140,248,0.22)' : 'whiteAlpha.50',
  );
  const badgeBorder = isStarred ? 'blue.300' : 'blue.200';

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
          <HStack spacing={3} fontSize="xs" color={descColor} mt={1}>
            {typeof starsCount === 'number' && (
              <Tooltip label={tooltipLabel} hasArrow placement="top">
                <Box
                  as={onToggleStar ? 'button' : 'div'}
                  type={onToggleStar ? 'button' : undefined}
                  display="inline-flex"
                  alignItems="center"
                  gap={1}
                  px={3}
                  py={1}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={badgeBorder}
                  bg={badgeBg}
                  color={isStarred ? 'blue.700' : 'blue.600'}
                  cursor={onToggleStar ? 'pointer' : 'default'}
                  fontWeight="semibold"
                  letterSpacing="-0.01em"
                  boxShadow="none"
                  transition="background-color 0.18s ease-out, color 0.18s ease-out, border-color 0.18s ease-out"
                  _hover={
                    onToggleStar
                      ? { bg: 'rgba(59,130,246,0.12)' }
                      : undefined
                  }
                  _active={
                    onToggleStar
                      ? { bg: 'rgba(59,130,246,0.18)' }
                      : undefined
                  }
                  onClick={onToggleStar}
                  aria-pressed={onToggleStar ? !!isStarred : undefined}
                >
                  <Box as="span">{formatCount(starsCount)}</Box>
                  <Box
                    as="span"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    w="18px"
                    h="18px"
                    borderRadius="full"
                    bg={isStarred ? 'yellow.200' : 'gray.100'}
                    flexShrink={0}
                  >
                    <StarIcon boxSize={2.5} color={isStarred ? 'yellow.500' : 'gray.400'} />
                  </Box>
                </Box>
              </Tooltip>
            )}
            {typeof viewsCount === 'number' && (
              <HStack spacing={1}>
                <Box as="span">{formatCount(viewsCount)}</Box>
                <ViewIcon boxSize={3} />
              </HStack>
            )}
            {typeof commentsCount === 'number' && (
              <HStack spacing={1}>
                <Box as="span">{formatCount(commentsCount)}</Box>
                <ChatIcon boxSize={3} />
              </HStack>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};


