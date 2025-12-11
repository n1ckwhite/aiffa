import React from "react";
import { Box, Heading, Text, Stack, VStack, Button, useColorModeValue } from "@chakra-ui/react";
import PersonLottieIcon from "@/shared/icons/components-icon/PersonLottieIcon";

const HeroSection: React.FC = () => {
  const primaryTextColor = useColorModeValue("gray.600", "gray.200");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.300");

  const handleScrollToContribution = React.useCallback(() => {
    const target = document.getElementById("creators-contribution");
    if (!target) {
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Box as="section" aria-label="Создатели AIFFA">
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 6, md: 10 }}
        align={{ base: "stretch", md: "center" }}
      >
        <VStack align="flex-start" spacing={4} flex={1}>
          <Heading as="h1" size="xl" letterSpacing="-0.04em">
            Создатели
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={primaryTextColor} lineHeight={1.8}>
            Люди, которые делают AIFFA лучше каждый день.
          </Text>
          <Text fontSize="sm" color={secondaryTextColor} lineHeight={1.8}>
            AIFFA — это не просто материалы. Это вклад сотен людей: авторов задач, создателей проектов, участников
            хакатонов, менторов и тех, кто поддерживает идею. Попасть сюда может каждый.
          </Text>
          <Button
            onClick={handleScrollToContribution}
            mt={1}
            size="sm"
            borderRadius="full"
            colorScheme="blue"
            variant="solid"
          >
            Как стать создателем
          </Button>
        </VStack>
        <Box
          flex={{ base: "none", md: 1 }}
          maxW={{ base: "280px", md: "360px" }}
          mx={{ base: "auto", md: 0 }}
        >
          <PersonLottieIcon />
        </Box>
      </Stack>
    </Box>
  );
};

export default HeroSection;


