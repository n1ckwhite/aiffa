import React from "react";
import { Box, Heading, Text, VStack, Stack, HStack, Button, Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import { FiArrowRight, FiMessageCircle, FiTarget, FiUsers } from "react-icons/fi";
import SupportBlock from "widgets/SupportBlock";
import { BusinessManTelescop } from "@/shared/icons/components-icon";

const ContributionSection: React.FC = () => {
  const primaryTextColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("blue.500", "blue.200");
  const cardBg = useColorModeValue("white", "whiteAlpha.50");
  const cardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const cardShadow = useColorModeValue(
    "0 18px 45px rgba(15,23,42,0.12)",
    "0 20px 50px rgba(0,0,0,0.75)",
  );

  return (
    <VStack align="stretch" spacing={5}>
      <Box
        as="section"
        id="creators-contribution"
        aria-label="Как стать создателем AIFFA"
      >
        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="2xl"
          p={{ base: 4, md: 5 }}
          boxShadow={cardShadow}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
          gap={{ base: 4, md: 6 }}
        >
          <Box
            flexShrink={0}
            maxW={{ base: "180px", md: "220px" }}
            mx={{ base: "auto", md: 0 }}
          >
          </Box>

          <VStack align="flex-start" spacing={3} flex={1}>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Как стать создателем
            </Heading>
            <Text fontSize="sm" color={secondaryTextColor} lineHeight={1.8}>
              Хочешь, чтобы твоё имя было в блоке создателей AIFFA? Начать можно с простых шагов.
            </Text>

            <Stack as="ul" spacing={2} pl={0}>
              <HStack as="li" spacing={2} align="flex-start">
                <Box
                  as={FiMessageCircle}
                  boxSize={4}
                  mt={0.5}
                  color={linkColor}
                  aria-hidden="true"
                />
                <Text fontSize="sm" color={primaryTextColor}>
                  Присоединиться к{" "}
                  <ChakraLink href="https://t.me/aiffa_hub" isExternal color={linkColor}>
                    Telegram‑сообществу AIFFA
                  </ChakraLink>{" "}
                  и рассказать о себе.
                </Text>
              </HStack>
              <HStack as="li" spacing={2} align="flex-start">
                <Box
                  as={FiTarget}
                  boxSize={4}
                  mt={0.5}
                  color={linkColor}
                  aria-hidden="true"
                />
                <Text fontSize="sm" color={primaryTextColor}>
                  Предложить задачу недели, материал или идею улучшения модулей.
                </Text>
              </HStack>
              <HStack as="li" spacing={2} align="flex-start">
                <Box
                  as={FiUsers}
                  boxSize={4}
                  mt={0.5}
                  color={linkColor}
                  aria-hidden="true"
                />
                <Text fontSize="sm" color={primaryTextColor}>
                  Помогать другим: делать ревью решений и делиться опытом в обсуждениях.
                </Text>
              </HStack>
            </Stack>

            <Button
              as="a"
              href="https://t.me/aiffa_hub"
              target="_blank"
              rel="noopener noreferrer"
              mt={1}
              size="md"
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
              px={6}
              py={3}
              bgGradient="linear(to-r, blue.400, blue.500)"
              color="white"
              boxShadow="0 12px 30px rgba(37, 99, 235, 0.4)"
              display="inline-flex"
              alignItems="center"
              gap={2}
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.600)",
                transform: "translateY(-1px)",
                boxShadow: "0 16px 36px rgba(37, 99, 235, 0.5)",
              }}
              _active={{
                transform: "translateY(0)",
                boxShadow: "0 8px 20px rgba(37, 99, 235, 0.45)",
              }}
              rightIcon={<FiArrowRight />}
            >
              Стать создателем AIFFA
            </Button>
          </VStack>
        </Box>
      </Box>

      <Box as="section" aria-label="Поддержка и сообщество AIFFA">
        <SupportBlock variant="modules" />
      </Box>
    </VStack>
  );
};

export default ContributionSection;


