import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { type CourseCardProps } from './types/CourseCard.types';
import { useCourseCardColors } from './colors/useCourseCardColors';
import { useCourseProgress } from './hooks/useCourseProgress';
import { AppBoxLink } from 'shared/ui/AppLink';
import { buildCourseCardContainerProps } from "./helpers/buildCourseCardContainerProps";
import { useCourseCardHoverState } from "./hooks/useCourseCardHoverState";
import { CourseCardContent } from "./parts";

const CourseCard: React.FC<CourseCardProps> = React.memo(({
  moduleId,
  title,
  description,
  lessonsCount,
  studyTime,
  level,
  icon,
  delay = 0,
  forceActive = false,
  to,
}) => {
  const { isActive, handlers } = useCourseCardHoverState({ forceActive });

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

  const { completedLessonsCount } = useCourseProgress({ moduleId, lessonsCount });
  const hoverTextColor = useColorModeValue('gray.700', 'gray.200');

  const commonProps = buildCourseCardContainerProps({
    isActive,
    delay,
    title,
    to,
    cardBg,
    cardHoverBg,
    borderColor,
    accentColor,
    shadowColor,
    hoverShadowColor,
    focusRing,
    topGradientEnd,
    ...handlers,
  });

  const content = (
    <CourseCardContent
      title={title}
      description={description}
      level={level}
      icon={icon}
      lessonsCount={lessonsCount}
      studyTime={studyTime}
      completedLessonsCount={completedLessonsCount}
      isActive={isActive}
      accentColor={accentColor}
      titleColor={titleColor}
      textColor={textColor}
      hoverTextColor={hoverTextColor}
      badgeShadow={badgeShadow}
      arrowHoverColor={arrowHoverColor}
      hoverShadowColor={hoverShadowColor}
    />
  );

  if (to) {
    return (
      <AppBoxLink to={to} {...commonProps}>
        {content}
      </AppBoxLink>
    );
  }

  return <Box {...commonProps}>{content}</Box>;
});

export default CourseCard;


