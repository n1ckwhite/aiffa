import React from "react";
import { Box, HStack, Heading } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { BlogArticleTitleRowProps } from "./types";

export const BlogArticleTitleRow: React.FC<BlogArticleTitleRowProps> = ({ title, titleColor, accentColor }) => {
  return (
    <HStack align="start" justify="space-between" spacing={3} mt={2}>
      <Heading
        as="h2"
        fontSize={{ base: "xl", md: "2xl" }}
        letterSpacing="-0.02em"
        lineHeight={1.2}
        color={titleColor}
        noOfLines={2}
        flex="1"
        minW={0}
        minH="2.4em"
      >
        {title}
      </Heading>
      <Box aria-hidden="true" color={accentColor} mt={1} flexShrink={0}>
        <FiArrowUpRight size={18} />
      </Box>
    </HStack>
  );
};


