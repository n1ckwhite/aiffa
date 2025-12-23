import React from "react";
import { AspectRatio, Box, HStack, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { BlogArticlesSkeletonGridProps } from "./types";

export const BlogArticlesSkeletonGrid: React.FC<BlogArticlesSkeletonGridProps> = ({
  pageSize,
  cardBorder,
  cardRadius,
  cardShadow,
  cardPadding,
  cardBg,
}) => {
  return (
    <SimpleGrid
      as="ul"
      minChildWidth={{ base: "100%", sm: "360px" }}
      spacing={{ base: 6, md: 7 }}
      listStyleType="none"
      m={0}
      p={0}
    >
      {Array.from({ length: pageSize }).map((_, i) => (
        <Box
          key={i}
          as="li"
          listStyleType="none"
          cursor="pointer"
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius={cardRadius}
          bg={cardBg}
          overflow="hidden"
          boxShadow={cardShadow}
        >
          <Box p={cardPadding} display="flex" flexDirection="column" h="full">
            <AspectRatio ratio={16 / 9} w="full" overflow="hidden" borderRadius="xl" mb={6}>
              <Skeleton />
            </AspectRatio>
            <Skeleton h="12px" w="110px" mb={3} />
            <Skeleton h="22px" w="95%" mb={3} />
            <Skeleton h="14px" w="100%" mb={2} />
            <Skeleton h="14px" w="85%" mb={6} />
            <Skeleton h="12px" w="180px" mb={5} />
            <HStack spacing={3} mt="auto" pt={2}>
              <Skeleton boxSize="36px" borderRadius="full" />
              <VStack align="start" spacing={1}>
                <Skeleton h="12px" w="120px" />
                <Skeleton h="12px" w="110px" />
              </VStack>
            </HStack>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};


