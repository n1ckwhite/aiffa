import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { StarIcon, ViewIcon, ChatIcon } from '@chakra-ui/icons';
import { type CourseCardProps } from './types/CourseCard.types';
import { getLevelColor } from '../model';
import { fadeInUp } from '../animations';
import { HeaderIcon, LessonsPill, StudyTimePill, CTAArrow } from './parts';
import PillBadge from 'shared/ui/PillBadge';
import { useCourseCardColors } from './colors/useCourseCardColors';
import { useCourseProgress } from './hooks/useCourseProgress';
import { formatCount } from 'shared/functions/formatCount';
import AuthorsCountPill from 'shared/ui/AuthorsCountPill';

const CourseCard: React.FC<CourseCardProps> = React.memo(({
  moduleId,
  title,
  description,
  lessonsCount,
  studyTime,
  starsCount,
  views,
  commentsCount,
  topAuthors,
  otherAuthorsCount,
  level,
  icon,
  delay = 0,
  forceActive = false,
  to,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isHovered || forceActive;

  const {
    borderColor,
    shadowColor,
    hoverShadowColor,
    focusRing,
    topGradientEnd,
    arrowHoverColor,
    cardBg,
    badgeShadow,
    cardHoverBg,
    titleColor,
    descColor: textColor,
    accentColor,
  } = useCourseCardColors();

  const { solvedLessonsCount } = useCourseProgress({ moduleId, lessonsCount });

  return (
    <Box
      display="block"
      bg={isActive ? cardHoverBg : cardBg}
      border="1px"
      borderColor={isActive ? accentColor : borderColor}
      borderRadius="24px"
      p={{ base: 6, md: 8 }}
      cursor="pointer"
      transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
      animation={`${fadeInUp} 0.6s ease-out ${delay}ms both`}
      position="relative"
      overflow="hidden"
      h="auto"
      _focusVisible={{ boxShadow: focusRing, outline: 'none' }}
      transform={isActive ? 'translateY(-10px) scale(1.02)' : undefined}
      boxShadow={isActive ? `0 18px 40px ${hoverShadowColor}, 0 0 0 1px ${accentColor}20` : `0 8px 28px ${shadowColor}`}
      _active={{ transform: 'translateY(-6px) scale(1.01)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(false)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
      _hover={{
        transform: ['none', null, 'translateY(-12px) scale(1.03)'],
        boxShadow: ['0 8px 28px ' + shadowColor, null, `0 25px 50px ${hoverShadowColor}, 0 0 0 1px ${accentColor}20`],
        borderColor: [borderColor, null, accentColor],
        bg: [cardBg, null, cardHoverBg],
        textDecoration: 'none',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '5px',
        bg: `linear-gradient(90deg, ${accentColor}, ${topGradientEnd}, ${accentColor})`,
        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '24px 24px 0 0',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: isActive ? `linear-gradient(135deg, ${accentColor}08, transparent)` : 'transparent',
        transition: 'background 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
        borderRadius: '24px',
      }}
      className="course-card"
      as={to ? (RouterLink as any) : 'div'}
      to={to as any}
      style={{ textDecoration: 'none' }}
      aria-label={to ? `Открыть материал: ${title}` : undefined}
    >
      <VStack align="stretch" spacing={4} h="full" justify="space-between">
        <HStack align="start" spacing={4}>
          <HeaderIcon icon={icon} accentColor={accentColor} isActive={isActive} />
          <Box flex={1}>
            <Text
              fontSize="xl"
              fontWeight="800"
              color={titleColor}
              letterSpacing="-0.03em"
              lineHeight="1.1"
              mb={level ? 2 : 0}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ color: accentColor }}
            >
              {title}
            </Text>
            {level && (
              <Box
                as="span"
                display="inline-flex"
                alignSelf="flex-start"
                boxShadow={`0 4px 12px ${badgeShadow}`}
                borderRadius="full"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ transform: 'scale(1.05)', boxShadow: `0 6px 16px ${badgeShadow}` }}
              >
                <PillBadge colorScheme={getLevelColor(level) as any} variant="outline">
                  {level}
                </PillBadge>
              </Box>
            )}
            <Text
              fontSize="sm"
              color={textColor}
              noOfLines={3}
              lineHeight="1.6"
              fontWeight="500"
              mt={2}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ color: useColorModeValue('gray.700', 'gray.200') }}
            >
              {description}
            </Text>
            <VStack align="start" spacing={1} mt={2}>
              <HStack
                spacing={3}
                fontSize="xs"
                color={textColor}
              >
                <HStack spacing={1}>
                  <Box as="span">{formatCount(starsCount)}</Box>
                  <StarIcon boxSize={3} color="yellow.400" />
                </HStack>
                <HStack spacing={1}>
                  <Box as="span">{formatCount(views)}</Box>
                  <ViewIcon boxSize={3} />
                </HStack>
                <HStack spacing={1}>
                  <Box as="span">{formatCount(commentsCount)}</Box>
                  <ChatIcon boxSize={3} />
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </HStack>

        <VStack spacing={3} align="start" pt={3} pr={14}>
          <LessonsPill
            lessonsCount={lessonsCount}
            accentColor={accentColor}
            isActive={isActive}
            solvedLessonsCount={solvedLessonsCount}
          />
          <StudyTimePill studyTime={studyTime} />
        </VStack>

        <CTAArrow isActive={isActive} accentColor={accentColor} arrowHoverColor={arrowHoverColor} hoverShadowColor={hoverShadowColor} />
      </VStack>
    </Box>
  );
});

export default CourseCard;


