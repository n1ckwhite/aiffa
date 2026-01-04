import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { getLevelColor } from "../../../../model";
import { CTAArrow, HeaderIcon, LessonsPill, StudyTimePill } from "../../index";
import type { CourseCardContentProps } from "../types/CourseCardContent.types";

export const CourseCardContent: React.FC<CourseCardContentProps> = ({
  title,
  description,
  level,
  icon,
  lessonsCount,
  studyTime,
  completedLessonsCount,
  isActive,
  accentColor,
  titleColor,
  textColor,
  hoverTextColor,
  badgeShadow,
  arrowHoverColor,
  hoverShadowColor,
}) => {
  return (
    <VStack align="stretch" spacing={4} h="full" justify="space-between">
      <HStack align="start" spacing={4} minW={0}>
        <HeaderIcon icon={icon} accentColor={accentColor} isActive={isActive} />
        <Box flex={1} minW={0}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={titleColor}
            letterSpacing="-0.03em"
            lineHeight="1.2"
            mb={level ? 2 : 0}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{ color: accentColor }}
            wordBreak="break-word"
            overflowWrap="anywhere"
            whiteSpace="normal"
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
              _hover={{ transform: "scale(1.05)", boxShadow: `0 6px 16px ${badgeShadow}` }}
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
            _hover={{ color: hoverTextColor }}
          >
            {description}
          </Text>
        </Box>
      </HStack>

      <VStack spacing={3} align="start" pt={3} pr={14}>
        <LessonsPill
          lessonsCount={lessonsCount}
          accentColor={accentColor}
          isActive={isActive}
          completedLessonsCount={completedLessonsCount}
        />
        <StudyTimePill studyTime={studyTime} />
      </VStack>

      <CTAArrow
        isActive={isActive}
        accentColor={accentColor}
        arrowHoverColor={arrowHoverColor}
        hoverShadowColor={hoverShadowColor}
      />
    </VStack>
  );
};


