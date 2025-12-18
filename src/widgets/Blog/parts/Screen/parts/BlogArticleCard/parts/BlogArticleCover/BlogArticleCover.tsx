import React from "react";
import { AspectRatio, Box, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { BlogCoverImage } from "../../../BlogCoverImage/BlogCoverImage";
import { BlogArticleCoverProps } from "./types";
import { useBlogArticleCoverColors } from "./colors/useBlogArticleCover";

export const BlogArticleCover: React.FC<BlogArticleCoverProps> = ({ title, coverImage, priority = false }) => {
  const { placeholderBg, placeholderBorder, placeholderText } = useBlogArticleCoverColors();
  const hasCover = Boolean((coverImage || "").trim());


  return (
    <AspectRatio ratio={16 / 9} w="full" overflow="hidden" borderRadius="lg" mb={5}>
      {hasCover ? (
        <BlogCoverImage src={coverImage as string} alt={title} priority={priority} />
      ) : (
        <Box
          w="full"
          h="full"
          bg={placeholderBg}
          borderWidth="1px"
          borderColor={placeholderBorder}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          px={6}
          textAlign="center"
        >
          <Icon as={FiImage} aria-hidden="true" boxSize={8} color={placeholderText} opacity={0.9} />
          <Text mt={2} fontSize="sm" color={placeholderText} noOfLines={2}>
            Обложка не добавлена
          </Text>
        </Box>
      )}
    </AspectRatio>
  );
};


