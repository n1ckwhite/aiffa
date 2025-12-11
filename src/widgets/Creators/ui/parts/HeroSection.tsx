import React from "react";
import { Box, Heading, Text, Stack, VStack, useColorModeValue } from "@chakra-ui/react";
import PersonLottieIcon from "@/shared/icons/components-icon/PersonLottieIcon";
import { BusinessManTelescop } from "@/shared/icons/components-icon";

const HeroSection: React.FC = () => {
  const primaryTextColor = useColorModeValue("gray.100", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.200", "gray.300");
  const cardBgGradient = useColorModeValue(
    "linear(to-br, rgba(15,23,42,0.98), rgba(147,51,234,0.95))",
    "linear(to-br, rgba(15,23,42,1), rgba(126,34,206,0.95))",
  );
  const cardBorderColor = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");

  return (
    <Box as="section" aria-label="Создатели AIFFA">
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={cardBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 5, md: 7 }}
        py={{ base: 5, md: 7 }}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.6}
          filter="blur(42px)"
          pointerEvents="none"
        >
          <Box
            position="absolute"
            top={{ base: "55%", md: "25%" }}
            left="-10%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(circle at 50% 50%, rgba(147,51,234,0.8), transparent 70%)"
          />
          <Box
            position="absolute"
            bottom="-15%"
            right="-5%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(circle at 50% 50%, rgba(236,72,153,0.75), transparent 70%)"
          />
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 5, md: 8 }}
          align={{ base: "center", md: "center" }}
          position="relative"
          zIndex={1}
        >
          <VStack
            align={{ base: "center", md: "flex-start" }}
            spacing={3}
            flex={1}
            textAlign={{ base: "center", md: "left" }}
          >
            <Box>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                textTransform="uppercase"
                letterSpacing="0.08em"
                color={secondaryTextColor}
                mb={1}
              >
                Команда создателей
              </Text>
              <Heading
                as="h1"
                size="xl"
                letterSpacing="-0.04em"
                color="white"
              >
                Создатели AIFFA
              </Heading>
            </Box>
            <Text
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="semibold"
              color={primaryTextColor}
              lineHeight={1.5}
            >
              Люди, которые делают AIFFA лучше каждый день.
            </Text>
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color={secondaryTextColor}
              lineHeight={1.9}
              maxW={{ base: "full", md: "520px" }}
            >
              AIFFA — это не просто материалы. Это вклад сотен людей: авторов задач, создателей проектов, участников
              хакатонов, менторов и тех, кто поддерживает идею. Попасть сюда может каждый.
            </Text>
          </VStack>
          <Box
            flex={{ base: "none", md: 1 }}
            maxW={{ base: "240px", md: "320px" }}
            mx={{ base: "auto", md: 0 }}
          >
            <BusinessManTelescop />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;


