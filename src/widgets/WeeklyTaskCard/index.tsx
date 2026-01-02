import React from 'react';
import { Box, VStack, Heading, Text, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FiMessageCircle, FiUserCheck } from 'react-icons/fi';
import { useWeeklyTaskCardColors } from './colors';
import type { WeeklyTaskCardProps } from './types';
import { getRing } from './model/ring';
import { IconRing } from './parts/IconRing';
import { TagBadge } from './parts/TagBadge';
import { AuthorInfo } from './parts/AuthorInfo';
import { RewardBar } from './parts/RewardBar';
import { BackgroundDeco } from './parts/BackgroundDeco';
import { DoneOverlay } from './parts/DoneOverlay';
import { formatCount } from 'shared/functions/formatCount';
import { AppBoxLink } from 'shared/ui/AppLink';

const WeeklyTaskCard: React.FC<WeeklyTaskCardProps> = ({
  label,
  description,
  done,
  tag,
  icon,
  colorScheme,
  to,
  authorName,
  authorUrl,
  authorAvatarUrl,
  starsCount,
  commentsCount,
  solvedCount,
}) => {
  const colors = useWeeklyTaskCardColors();
  const ring = getRing(colorScheme);
  const effectiveStars = typeof starsCount === 'number' ? starsCount : 37;
  const effectiveComments = typeof commentsCount === 'number' ? commentsCount : 12;
  const effectiveSolved = typeof solvedCount === 'number' ? solvedCount : 128;

  return (
    <AppBoxLink
      to={to}
      borderRadius="20px"
      p={5}
      minH="280px"
      position="relative"
      overflow="hidden"
      bg={colors.cardBg}
      boxShadow={colors.taskCardShadow}
      borderWidth="1px"
      borderColor={done ? 'green.300' : 'transparent'}
      transition="all 0.25s ease"
      _hover={{ transform: 'translateY(-4px)', boxShadow: colors.taskCardShadowHover }}
      style={{ textDecoration: 'none' }}
    >
      {done && <DoneOverlay />}

      <BackgroundDeco ring={ring} />

      <Box display="grid" gridTemplateRows="auto 1fr auto" h="100%" gap={3} position="relative" zIndex={5}>
        <VStack spacing={2}>
          <IconRing ring={ring} taskInnerCircleBg={colors.taskInnerCircleBg} taskInnerBorder={colors.taskInnerBorder} icon={icon} />
          <TagBadge tag={tag} colorScheme={colorScheme} />
        </VStack>

        <Box display="flex" alignItems="center" justifyContent="center" flexDir="column" textAlign="center" gap={2}>
          <Heading size="md" fontWeight="semibold" noOfLines={2} textAlign="center">{label}</Heading>
          {description && (<Text fontSize={{ base: 'sm', md: 'sm' }} color={colors.descriptionTask} noOfLines={4} textAlign="center">{description}</Text>)}
          <AuthorInfo
            authorName={authorName}
            authorUrl={authorUrl}
            authorAvatarUrl={authorAvatarUrl}
            authorMutedColor={colors.descColor}
            authorBorderColor={colors.borderColor}
            authorLinkColor={colors.authorLink}
          />
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
            fontSize="xs"
            color={colors.descColor}
          >
            <Box as="span" display="inline-flex" alignItems="center" gap={1}>
              <Box as="span">
                {formatCount(effectiveStars)}
              </Box>
              <StarIcon boxSize={3} color="yellow.400" />
            </Box>
            <Box as="span" display="inline-flex" alignItems="center" gap={1}>
              <Box as="span">
                {formatCount(effectiveComments)}
              </Box>
              <Icon as={FiMessageCircle} boxSize={3.5} />
            </Box>
            <Box as="span" display="inline-flex" alignItems="center" gap={1}>
              <Box as="span">
                {formatCount(effectiveSolved)}
              </Box>
              <Icon as={FiUserCheck} boxSize={3.5} color={colors.solvedIconColor} />
            </Box>
          </Box>
        </Box>

        <RewardBar ring={ring} borderColor={colors.taskInnerBorder} />
      </Box>
    </AppBoxLink>
  );
};

export default WeeklyTaskCard;


