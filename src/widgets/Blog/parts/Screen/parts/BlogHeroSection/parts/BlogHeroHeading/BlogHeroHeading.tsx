import React from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { BlogHeroHeadingProps } from "./types";



export const BlogHeroHeading: React.FC<BlogHeroHeadingProps> = ({ theme, isEmptyResults }) => {
  return (
    <VStack as="header" spacing={3} align="center" textAlign="center" pb={isEmptyResults ? { base: 3, md: 5 } : { base: 6, md: 8 }}>
      <Heading id="blog-title" as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color={theme.titleColor}>
        Блог AIFFA
      </Heading>
      <Text fontSize={{ base: "sm", md: "lg" }} color={theme.descColor} maxW={{ base: "100%", md: "820px" }}>
        Читай разборы и практику от участников AIFFA — и делись своим опытом. Здесь ценят вклад: кейсы, ошибки, находки и решения,
        которые помогают сообществу расти.
      </Text>
    </VStack>
  );
};


