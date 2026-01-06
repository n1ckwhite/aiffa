import React from "react";
import { HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FiClock, FiEye, FiMessageCircle, FiStar } from "react-icons/fi";
import { BlogArticleStatsRowProps } from "./types";

export const BlogArticleStatsRow: React.FC<BlogArticleStatsRowProps> = ({
  descColor,
  accentBlue,
  views,
  stars,
  isStarred,
  comments,
  readingTime,
  formatCount,
}) => {
  const starActiveColor = useColorModeValue("yellow.500", "yellow.300");
  return (
    <HStack spacing={4} color={descColor} fontSize="sm" mt={4}>
      <HStack spacing={1.5}>
        <Icon as={FiEye} aria-hidden="true" color={accentBlue} />
        <Text as="span">{formatCount(views)}</Text>
      </HStack>
      <HStack spacing={1.5}>
        {isStarred ? (
          <StarIcon boxSize={3} color={starActiveColor} aria-hidden="true" />
        ) : (
          <Icon as={FiStar} aria-hidden="true" color={descColor} />
        )}
        <Text as="span">{formatCount(stars)}</Text>
      </HStack>
      <HStack spacing={1.5}>
        <Icon as={FiMessageCircle} aria-hidden="true" color="green.400" />
        <Text as="span">{formatCount(comments)}</Text>
      </HStack>
      <HStack spacing={1.5}>
        <Icon as={FiClock} aria-hidden="true" color="purple.400" />
        <Text as="span">{readingTime ?? "—"}</Text>
      </HStack>
    </HStack>
  );
};


