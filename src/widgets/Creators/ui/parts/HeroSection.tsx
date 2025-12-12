import React from "react";
import { Box, Heading, Text, Stack, VStack, HStack, useColorModeValue } from "@chakra-ui/react";
import { FiMessageCircle, FiTarget, FiUsers } from "react-icons/fi";
import { BusinessManTelescop } from "@/shared/icons/components-icon";

const HeroSection: React.FC = () => {
  const primaryTextColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const pillBorderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const pillHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const cardBgGradient = useColorModeValue(
    "linear(to-br, white, gray.50)",
    "linear(to-br, rgba(15,23,42,1), rgba(30,64,175,0.7))",
  );
  const cardBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const leftGlowGradient = useColorModeValue(
    "radial(circle at 50% 50%, rgba(59,130,246,0.35), transparent 70%)",
    "radial(circle at 50% 50%, rgba(147,51,234,0.8), transparent 70%)",
  );
  const rightGlowGradient = useColorModeValue(
    "radial(circle at 50% 50%, rgba(129,140,248,0.35), transparent 70%)",
    "radial(circle at 50% 50%, rgba(236,72,153,0.75), transparent 70%)",
  );

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
          opacity={useColorModeValue(0.45, 0.6)}
          filter="blur(42px)"
          pointerEvents="none"
        >
          <Box
            position="absolute"
            top={{ base: "55%", md: "25%" }}
            left="-10%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient={leftGlowGradient}
          />
          <Box
            position="absolute"
            bottom="-15%"
            right="-5%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient={rightGlowGradient}
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
                as="p"
                fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                letterSpacing="-0.04em"
                color={useColorModeValue("gray.900", "white")}
              >
                Команда создателей AIFFA
              </Heading>
            </Box>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              fontWeight="semibold"
              color={primaryTextColor}
              lineHeight={1.5}
            >
              Люди, которые делают AIFFA лучше каждый день.
            </Text>
            <Text
              fontSize={{ base: "xs", sm: "sm", md: "sm" }}
              color={secondaryTextColor}
              lineHeight={1.9}
              maxW={{ base: "full", sm: "420px", md: "520px" }}
            >
              AIFFA — это экосистема, которую создают люди: авторы задач и материалов, создатели проектов, участники
              хакатонов, менторы и те, кто поддерживает идею. Попасть в эту команду может каждый.
            </Text>
            <Stack
              as="ul"
              aria-label="Чем занимаются создатели AIFFA"
              direction={{ base: "column", lg: "row" }}
              spacing={{ base: 3, lg: 4 }}
              pt={2}
              w="full"
              textAlign="left"
              justify={{ base: "center", lg: "flex-start" }}
              flexWrap={{ base: "wrap", lg: "nowrap" }}
            >
              <HStack
                as="li"
                spacing={3}
                align="flex-start"
                bg={useColorModeValue("whiteAlpha.900", "whiteAlpha.100")}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={pillBorderColor}
                px={3.5}
                py={3}
                flex={1}
                minW={{ base: "100%", md: "260px" }}
                maxW={{ base: "420px", lg: "auto" }}
                mx={{ base: "auto", lg: 0 }}
                boxShadow={useColorModeValue("sm", "sm")}
                transition="background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease"
                _hover={{
                  bg: pillHoverBg,
                  boxShadow: useColorModeValue("md", "md"),
                  borderColor: accentColor,
                  transform: "translateY(-1px)",
                }}
              >
                <Box
                  w={{ base: 8, md: 9 }}
                  h={{ base: 8, md: 9 }}
                  borderRadius="full"
                  bg={useColorModeValue("blue.50", "whiteAlpha.100")}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Box
                    as={FiUsers}
                    aria-hidden="true"
                    boxSize={{ base: 5, md: 5 }}
                    color={useColorModeValue("blue.500", "blue.300")}
                  />
                </Box>
                <Text fontSize={{ base: "xs", md: "sm" }} color={secondaryTextColor}>
                  Помогают улучшать модули и задачи, чтобы обучение оставалось актуальным.
                </Text>
              </HStack>
              <HStack
                as="li"
                spacing={3}
                align="flex-start"
                bg={useColorModeValue("whiteAlpha.900", "whiteAlpha.100")}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={pillBorderColor}
                px={3.5}
                py={3}
                flex={1}
                minW={{ base: "100%", md: "260px" }}
                maxW={{ base: "420px", lg: "auto" }}
                mx={{ base: "auto", lg: 0 }}
                boxShadow={useColorModeValue("sm", "sm")}
                transition="background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease"
                _hover={{
                  bg: pillHoverBg,
                  boxShadow: useColorModeValue("md", "md"),
                  borderColor: accentColor,
                  transform: "translateY(-1px)",
                }}
              >
                <Box
                  w={{ base: 8, md: 9 }}
                  h={{ base: 8, md: 9 }}
                  borderRadius="full"
                  bg={useColorModeValue("purple.50", "whiteAlpha.100")}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Box
                    as={FiTarget}
                    aria-hidden="true"
                    boxSize={{ base: 5, md: 5 }}
                    color={useColorModeValue("purple.500", "purple.300")}
                  />
                </Box>
                <Text fontSize={{ base: "xs", md: "sm" }} color={secondaryTextColor}>
                  Задают направление развития и помогают не застрять на сложных темах.
                </Text>
              </HStack>
              <HStack
                as="li"
                spacing={3}
                align="flex-start"
                bg={useColorModeValue("whiteAlpha.900", "whiteAlpha.100")}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={pillBorderColor}
                px={3.5}
                py={3}
                flex={1}
                minW={{ base: "100%", md: "260px" }}
                maxW={{ base: "420px", lg: "auto" }}
                mx={{ base: "auto", lg: 0 }}
                boxShadow={useColorModeValue("sm", "sm")}
                transition="background-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease"
                _hover={{
                  bg: pillHoverBg,
                  boxShadow: useColorModeValue("md", "md"),
                  borderColor: accentColor,
                  transform: "translateY(-1px)",
                }}
              >
                <Box
                  w={{ base: 8, md: 9 }}
                  h={{ base: 8, md: 9 }}
                  borderRadius="full"
                  bg={useColorModeValue("teal.50", "whiteAlpha.100")}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Box
                    as={FiMessageCircle}
                    aria-hidden="true"
                    boxSize={{ base: 5, md: 5 }}
                    color={useColorModeValue("teal.500", "teal.300")}
                  />
                </Box>
                <Text fontSize={{ base: "xs", md: "sm" }} color={secondaryTextColor}>
                  Создают поддерживающее сообщество, где можно задать вопрос и получить отзыв.
                </Text>
              </HStack>
            </Stack>
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


