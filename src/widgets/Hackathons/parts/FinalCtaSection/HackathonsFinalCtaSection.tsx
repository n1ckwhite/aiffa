import React from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import PillBadge from "@/shared/ui/PillBadge";

const finalCtaGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.35);
  }
  60% {
    box-shadow: 0 0 0 22px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

const HackathonsFinalCtaSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor, accentBorderColor } =
    useHackathonsColors();
  const finalCtaBgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.9))"
  );

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-final-cta-title"
      display="flex"
      justifyContent="center"
      px={{ base: 3, md: 4 }}
    >
      <Box
        position="relative"
        overflow="hidden"
        bgGradient={finalCtaBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={accentBorderColor}
        px={{ base: 3, sm: 4, md: 8 }}
        py={{ base: 5, md: 8 }}
        maxW="1200px"
        mx="auto"
        animation={`${finalCtaGlow} 14s ease-out infinite`}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.6}
          filter="blur(42px)"
          pointerEvents="none"
          aria-hidden="true"
        >
          <Box
            position="absolute"
            top="-10%"
            left="-12%"
            w={{ base: "240px", md: "280px" }}
            h={{ base: "240px", md: "280px" }}
            bgGradient="radial(circle at 30% 30%, rgba(59,130,246,0.9), transparent)"
          />
          <Box
            position="absolute"
            bottom="-18%"
            right="-8%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(circle at 70% 70%, rgba(244,114,182,0.85), transparent)"
          />
        </Box>

        <Stack
          direction="column"
          spacing={{ base: 5, md: 6 }}
          align="center"
          justify="center"
          position="relative"
          zIndex={1}
        >
          <Box
            textAlign={{ base: "center", md: "center" }}
            mx={{ base: "auto", md: 0 }}
          >
            <Box mb={3}>
              <PillBadge colorScheme="blue" variant="outline" uppercase>
                Финальный шаг
              </PillBadge>
            </Box>
            <Heading
              id="hackathons-final-cta-title"
              as="h2"
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            >
              Готовы попробовать себя в хакатоне или прийти как партнёр?
            </Heading>
            <Text
              mt={3}
              fontSize={{ base: "md", md: "lg" }}
              color={mutedTextColor}
            >
              Присоединяйтесь к хакатонам AIFFA, чтобы собрать сильный кейс,
              прокачать навыки и познакомиться с единомышленниками. Или приходите
              как партнёр — предложите свою задачу и поработайте с мотивированными
              разработчиками.
            </Text>
          </Box>

          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            w={{ base: "full", md: "auto" }}
            justify={{ base: "center", md: "flex-end" }}
            align={{ base: "stretch", sm: "center" }}
            maxW={{ base: "480px", md: "unset" }}
            mx={{ base: "auto", md: 0 }}
          >
            <Button
              as="a"
              href="https://t.me/nickwhite_web"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              fontWeight="semibold"
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 3.5 }}
              w={{ base: "100%", sm: "auto" }}
              minW={{ sm: "220px" }}
              bgGradient="linear(to-r, blue.600, blue.700)"
              color="white"
              transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
              _hover={{
                bgGradient: "linear(to-r, blue.700, blue.800)",
                transform: { base: "none", md: "translateY(-1px)" },
                boxShadow: "lg",
              }}
              _active={{
                bgGradient: "linear(to-r, blue.800, blue.900)",
                transform: { base: "none", md: "translateY(0)" },
                boxShadow: "md",
              }}
            >
              Участвовать в хакатоне
            </Button>
            <Button
              as="a"
              href="/partners"
              variant="outline"
              size="lg"
              fontWeight="semibold"
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 3.5 }}
              w={{ base: "100%", sm: "auto" }}
              minW={{ sm: "220px" }}
              borderColor={useColorModeValue("whiteAlpha.800", "whiteAlpha.700")}
              bg={useColorModeValue("whiteAlpha.900", "rgba(15,23,42,0.9)")}
              _hover={{
                bg: useColorModeValue("white", "rgba(15,23,42,0.98)"),
                borderColor: accentBorderColor,
              }}
            >
              Стать партнёром
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsFinalCtaSection;


